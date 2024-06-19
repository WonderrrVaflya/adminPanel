import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../types';
import { Button, Form, Input, Col, Row } from 'antd';

const StorePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`https://parsertovarov-6b40c4ac317f.herokuapp.com/sites`);
        if (id) {
          const storeData = response.data.find((item: Store) => item.id === parseInt(id, 10));
          setStore(storeData);
        }
      } catch (error) {
        console.error('Ошибка получения магазина:', error);
      }
    };

    fetchStore();
  }, [id]);

  const addLinks = async (values: any) => {
    try {
      const newLinks = values.links.split('\n').filter((link: string) => link.trim() !== '');
      const updatedStore = { ...store, links: newLinks };
      await axios.put(`http://localhost:5000/stores/${id}`, updatedStore);
      setStore(updatedStore as Store);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка добавления ссылок:', error);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '10px' }}>
      <Col span={20}>
        <div>
          {store && (
            <div>
              <h1>{store.name}</h1>
              <p>Широта: {store.latitude}</p>
              <p>Долгота: {store.longitude}</p>
              <h2>Добавить ссылки</h2>
              <Form form={form} onFinish={addLinks}>
                <Form.Item name="links" rules={[{ required: true, message: 'Введите ссылки!' }]}>
                  <Input.TextArea rows={10} placeholder="Вставьте ссылки здесь, по одной на строку" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Добавить ссылки</Button>
                </Form.Item>
              </Form>
              {store.links && store.links.length > 0 && (
                <div>
                  <h2>Ссылки</h2>
                  <ul>
                    {store.links.split('\n').map((link: string, index: number) => (
                      <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default StorePage;




