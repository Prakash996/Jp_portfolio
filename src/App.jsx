import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import MainBody from './components/MainBody';

function App() {
  return (
    <main className="main">
      <Header />
      <ParticleBackground>
        <MainBody />
      </ParticleBackground>
    </main>
  );
}

export default App;
