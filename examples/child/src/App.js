import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home.tsx';
import About from './pages/about.tsx';


function App() {
  return (
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
