import {
  Component,
  lazy,
  Suspense,
  useCallback,
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
        <LandingPage
        isReady={isPortfolioReady}
        isEntering={isEntering}
        onLoaded={handleLoaded}
        onEnter={handleEnter}
        />
        <ActionModal
          id="portfolio-load-error"
          open={loadError}
          onClose={handleRetry}
          title="Unable to load portfolio"
          description="The portfolio response was rejected or interrupted. Return to loading and try again."
        >
          <button
            type="button"
            onClick={handleRetry}
            className="w-full rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            Retry loading
          </button>
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
