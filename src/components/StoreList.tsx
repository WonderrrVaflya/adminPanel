import React from 'react';
import { Table, Button, Popover } from 'antd';
import { Store } from '../types';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface StoreListProps {
  stores: Store[];
  onToggleActive: (id: string, active: boolean) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onToggleActive }) => {
  const navigate = useNavigate();

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const updatedStore = { active: !currentActive };
      await axios.patch(`http://localhost:5000/stores/${id}`, updatedStore);
      onToggleActive(id, !currentActive);
    } catch (error) {
      console.error('Ошибка изменения статуса активности:', error);
    }
  };

  const columns = [
    {
      title: 'Название магазина',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Store) => (
        <>
          <Popover
            content={
              <div>
                <Button type="link" onClick={() => handleToggleActive(record.id, record.active)}>
                  {record.active ? 'Остановить' : 'Запустить'}
                </Button>
              </div>
            }
            trigger="click"
          >
            <SettingOutlined style={{ marginRight: 10 }} />
          </Popover>
          <span style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => navigate(`/stores/${record.id}`)}>
            {text}
          </span>
        </>
      ),
    },
    {
      title: 'Количество товаров',
      dataIndex: 'itemCount',
      key: 'itemCount',
    },
    {
      title: 'Запарсено за сегодня',
      dataIndex: 'scrapedItemCount',
      key: 'scrapedItemCount',
    },
    {
      title: 'Активность',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <span>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: active ? 'green' : 'red',
            }}
          ></span>
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={stores} rowKey="id" />;
};

export default StoreList;



