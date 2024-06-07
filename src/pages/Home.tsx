import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreForm from '../components/StoreForm';
import StoreList from '../components/StoreList';
import { Store } from '../types';

const Home: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/stores');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const addStore = async (store: Store) => {
    try {
      const response = await axios.post('http://localhost:5000/stores', store);
      setStores([...stores, response.data]);
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  const deleteStore = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/stores/${id}`);
      setStores(stores.filter(store => store.id !== id));
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  return (
    <div>
      <StoreForm onAddStore={addStore} />
      <StoreList stores={stores} onDeleteStore={deleteStore} />
    </div>
  );
};

export default Home;
