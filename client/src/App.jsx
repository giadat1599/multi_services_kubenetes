import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import Fibonacci from './Fibonacci';
import OtherPage from './OtherPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Next Page</Link>
        </div>
        <h1>Fibonnaci(Vite + React) Version 2.0.1</h1>
        <div>
          <Routes>
            <Route path="/" element={<Fibonacci />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
