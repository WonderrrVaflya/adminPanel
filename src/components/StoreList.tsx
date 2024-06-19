import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Store } from '../types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('https://parsertovarov-6b40c4ac317f.herokuapp.com/sites');
        setStores(response.data);
      } catch (error) {
        console.error('Ошибка получения списка магазинов:', error);
      }
    };

    fetchStores();
  }, []);

  const columns = [
    {
      title: 'Название магазина',
      dataIndex: 'Name',
      key: 'Name',
      render: (text: string, record: Store) => (
        <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => navigate(`/stores/${record.id}`)}>
          {text}
        </span>
      ),
    },
    {
      title: 'Ссылки',
      dataIndex: 'URLs',
      key: 'URLs',
      render: (urls: string) => (
        <ul>
          {urls.split('\n').map((link, index) => (
            <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
          ))}
        </ul>
      ),
    },
  ];

  return <Table columns={columns} dataSource={stores} rowKey="ID" />;
};

export default StoreList;

