import React from 'react';
import { List, Button } from 'antd';
import { Store } from '../types';
import { Link }  from 'react-router-dom';

interface StoreListProps {
  stores: Store[];
  onDeleteStore: (id: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({ stores, onDeleteStore }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={stores}
      renderItem={store => (
        <List.Item
          actions={[
            <Link to={`/edit/${store.id}`} key="edit">Редактировать</Link>,
            <Button onClick={() => onDeleteStore(store.id)} key="delete">Удалить</Button>
          ]}
        >
          <List.Item.Meta
            title={store.name}
            description={`Широта: ${store.latitude}, Долгота: ${store.longitude}`}
          />
          {store.links.length > 0 && (
            <div>
              <strong>Ссылки:</strong>
              <ul>
                {store.links.map((link, index) => (
                  <li key={index}><a href={link}>{link}</a></li>
                ))}
              </ul>
            </div>
          )}
        </List.Item>
      )}
    />
  );
};

export default StoreList;
