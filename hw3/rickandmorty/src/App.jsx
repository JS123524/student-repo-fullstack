import {
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router';

import Home from './pages/Home';
import Characters from './pages/Characters';
import Species from './pages/Species';
import Locations from './pages/Locations';

import './App.css';

const App = function App() {
  return (
    <div className="app">
      <header>
        <h1>Rick and Morty</h1>

        <nav aria-label="Main navigation">
          <Link to="/home">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/species">Species</Link>
          <Link to="/locations">Locations</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
