import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreForm from '../components/StoreForm';
import StoreList from '../components/StoreList';
import { Store } from '../types';
import { Row, Col } from 'antd';

const Home: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get('https://parsertovarov-6b40c4ac317f.herokuapp.com/sites');
      setStores(response.data);
    } catch (error) {
      console.error('Ошибка получения магазинов:', error);
    }
  };

  const addStore = async (store: Store) => {
    try {
      const response = await axios.post('https://parsertovarov-6b40c4ac317f.herokuapp.com/sites', store);
      setStores([...stores, response.data]);
    } catch (error) {
      console.error('Ошибка добавления магазина:', error);
    }
  };

  // const toggleActive = async (id: string, active: boolean) => {
  //   setStores(stores.map(store => store.ID === id ? { ...store, active } : store));
  // };

  return (
    <div>
      <Row justify="center" style={{ marginTop: '10px' }}>
        <Col span={20}>
          <StoreForm onAddStore={addStore} />
          <StoreList />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
