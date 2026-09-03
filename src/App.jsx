import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Northstar home">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>northstar</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#approach">Approach</a>
          <a href="#principles">Principles</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Get started <span aria-hidden="true">-&gt;</span></a>
      </header>

      <section className="hero" id="top">
        <ParticleBackground />
      </section>

      {/* <footer id="contact">
      </footer> */}
    </main>
  );
}

export default App;
