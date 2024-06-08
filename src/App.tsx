import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StorePage from './pages/StorePage';
import MaterialPage from './pages/MaterialPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>    
        <Route path="/" element={<Home />} />
        <Route path="/stores/:id" element={<StorePage />} />
        <Route path="/materials/:id" element={<MaterialPage />} />
      </Routes>
    </Router>
  );
};

export default App;