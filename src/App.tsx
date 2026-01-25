import { Header, Hero, MenuSection, About, Location, Footer } from './components';
import './App.css';

function App() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true"></div>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <About />
        <Location />
      </main>
      <Footer />
    </>
  );
}

export default App;
