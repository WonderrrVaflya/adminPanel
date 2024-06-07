import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Store } from './types';
import Home from './pages/Home';
import EditStore from './pages/EditStore';

const App: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const updateStore = (updatedStore: Store) => {
    setStores(stores.map(store => store.id === updatedStore.id ? updatedStore : store));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditStore stores={stores} onUpdateStore={updateStore} />} />
      </Routes>
    </Router>
  );
};

export default App;

