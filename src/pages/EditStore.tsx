import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, List } from 'antd';
import { Store } from '../types';

interface EditStoreProps {
  stores: Store[];
  onUpdateStore: (updatedStore: Store) => void;
}

const EditStore: React.FC<EditStoreProps> = ({ onUpdateStore }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | undefined>(undefined);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stores/${id}`);
        setStore(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };
    fetchStore();
  }, [id, form]);

  const onFinish = async (values: Omit<Store, 'id' | 'links'>) => {
    if (store) {
      const updatedStore: Store = { ...store, ...values };
      try {
        await axios.put(`http://localhost:5000/stores/${store.id}`, updatedStore);
        onUpdateStore(updatedStore);
        navigate('/');
      } catch (error) {
        console.error('Error updating store:', error);
      }
    }
  };

  const addLink = async (link: string) => {
    if (store) {
      const updatedStore: Store = { ...store, links: [...store.links, link] };
      try {
        await axios.put(`http://localhost:5000/stores/${store.id}`, updatedStore);
        setStore(updatedStore);
        onUpdateStore(updatedStore);
      } catch (error) {
        console.error('Error adding link:', error);
      }
    }
  };

  const deleteLink = async (linkIndex: number) => {
    if (store) {
      const updatedStore: Store = { ...store, links: store.links.filter((_, index) => index !== linkIndex) };
      try {
        await axios.put(`http://localhost:5000/stores/${store.id}`, updatedStore);
        setStore(updatedStore);
        onUpdateStore(updatedStore);
      } catch (error) {
        console.error('Error deleting link:', error);
      }
    }
  };

  return (
    store ? (
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" rules={[{ required: true, message: 'Введите Название магазина!' }]}>
            <Input placeholder="Название магазина" />
        </Form.Item>
        <Form.Item name="latitude" rules={[{ required: true, message: 'Введите Широту!' }]}>
            <Input placeholder="Широта" />
        </Form.Item>
        <Form.Item name="longitude" rules={[{ required: true, message: 'Введите Долготу!' }]}>
            <Input placeholder="Долгота" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Add Store</Button>
        </Form.Item>
        <Form.Item label="Add Link">
          <Input.Search
            placeholder="Добавьте ссылку"
            enterButton="Добавить"
            onSearch={value => addLink(value)}
          />
        </Form.Item>
        <List
          header={<div>Links</div>}
          bordered
          dataSource={store.links}
          renderItem={(link, index) => (
            <List.Item
              actions={[<Button onClick={() => deleteLink(index)} key="delete">Delete</Button>]}
            >
              {link}
            </List.Item>
          )}
        />
      </Form>
    ) : (
      <div>Store not found</div>
    )
  );
};

export default EditStore;
