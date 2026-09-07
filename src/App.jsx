import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import MainBody from './components/MainBody';

function App() {
  return (
    <main className="app-shell">
      <Header />
      <ParticleBackground>
        <MainBody />
      </ParticleBackground>
    </main>
  );
}

export default App;
