import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./components/LandingPage";
import ActionModal from "./components/ui/ActionModal";
import {
  enterPortfolio,
  portfolioLoaded,
  portfolioLoadFailed,
  resetPortfolio,
} from "./store/appSlice";

const loadPortfolio = () => import("./components/PortfolioContent");
const PortfolioContent = lazy(loadPortfolio);

function preloadPortfolio() {
  let timeoutId;

  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      reject(new Error("Portfolio loading timed out"));
    }, 10000);
  });

  return Promise.race([loadPortfolio(), timeout]).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

class PortfolioErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

function App() {
  const dispatch = useDispatch();
  const { hasEntered, isEntering, isPortfolioReady, loadError } = useSelector(
    (state) => state.app,
  );
  const portfolioLoadRef = useRef(null);

  useEffect(() => {
    const sectionAliases = {
      home: "home",
    };
    const requestedSection = window.location.hash.slice(1);
    const sectionId = sectionAliases[requestedSection] ?? requestedSection;
    const validSections = ["home", "skills", "experience"];

    if (requestedSection && !validSections.includes(sectionId)) {
      window.history.replaceState(null, "", "#home");
    } else if (sectionId !== requestedSection) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }

    if (requestedSection && !hasEntered) {
      dispatch(enterPortfolio());
    }
  }, [dispatch, hasEntered]);

  useEffect(() => {
    if (!hasEntered || !window.location.hash) {
      return;
    }

    const target = document.getElementById(window.location.hash.slice(1));

    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      });
    }
  }, [hasEntered, isPortfolioReady]);

  const handleLoaded = useCallback(async () => {
    try {
      if (!portfolioLoadRef.current) {
        portfolioLoadRef.current = preloadPortfolio();
      }

      await portfolioLoadRef.current;
      dispatch(portfolioLoaded());
    } catch {
      dispatch(portfolioLoadFailed());
    }
  }, [dispatch]);

  const handleEnter = useCallback(() => {
    dispatch(enterPortfolio());
  }, [dispatch]);

  const handleError = useCallback(() => {
    dispatch(portfolioLoadFailed());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(resetPortfolio());
    window.location.reload();
  }, [dispatch]);

  if (!hasEntered) {
    return (
      <div>
        <LandingPage isReady={isPortfolioReady} isEntering={isEntering} onLoaded={handleLoaded} onEnter={handleEnter}/>
          <ActionModal
            id="portfolio-load-error"
            open={loadError}
            onClose={() => loadError(false)}
            title="Unable to load portfolio"
            description=""
            showConfirmButton
            confirmText="Retry loading"
            onConfirm={handleRetry}
          >
            <p className="text-sm leading-6 text-white/60">
              We couldn't load the portfolio data. Please try again.
            </p>
          </ActionModal>

      </div>
    );
  }

  return (
    <PortfolioErrorBoundary onError={handleError}>
      <Suspense
        fallback={(
          <LandingPage
            isReady={true}
            isEntering={true}
            showEnter={false}
            onLoaded={handleLoaded}
            onEnter={handleEnter}
          />
        )}
      >
        <PortfolioContent />
      </Suspense>
    </PortfolioErrorBoundary>
  );
}

export default App;
