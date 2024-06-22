import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Store } from '../types';
import StoreList from '../components/StoreList';
import StoreForm from '../components/StoreForm';

const Home: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stores');
        setStores(response.data);
      } catch (error) {
        console.error('Ошибка получения магазинов:', error);
      }
    };

    fetchStores();
  }, []);

  const handleAddStore = async (store: Store) => {
    try {
      const response = await axios.post('http://localhost:5000/stores', store);
      setStores([...stores, response.data]);
    } catch (error) {
      console.error('Ошибка добавления магазина:', error);
    }
  };

  const handleToggleActive = (id: string, active: boolean) => {
    setStores(stores.map(store => store.id === id ? { ...store, active } : store));
  };

  return (
    <div>
      <StoreForm onAddStore={handleAddStore} />
      <StoreList stores={stores} onToggleActive={handleToggleActive} />
    </div>
  );
};

export default Home;

