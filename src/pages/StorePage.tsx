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
        const response = await axios.get(`http://localhost:5000/stores/${id}`);
        setStore(response.data);
      } catch (error) {
        console.error('Ошибка получения магазина:', error);
      }
    };

    fetchStore();
  }, [id]);

  const addLinks = async (values: any) => {
    try {
      const newLinks = values.links.split('\n').filter((link: string) => link.trim() !== '');
      const updatedLinks = store?.URLs ? store.URLs + '\n' + newLinks.join('\n') : newLinks.join('\n');
      const updatedStore = { ...store, URLs: updatedLinks };
      await axios.put(`http://localhost:5000/stores/${id} `, updatedStore);
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
              <p>Адрес: <b>{store.address}</b></p>
              <p>Широта: <b>{store.latitude}</b></p>
              <p>Долгота: <b>{store.longitude}</b></p>
              <h2>Добавить ссылки</h2>
              <Form form={form} onFinish={addLinks}>
                <Form.Item name="links" rules={[{ required: true, message: 'Введите ссылки!' }]}>
                  <Input.TextArea rows={10} placeholder="Вставьте ссылки здесь, по одной на строку" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Добавить ссылки</Button>
                </Form.Item>
              </Form>
              {store.URLs && store.URLs.length > 0 && (
                <div>
                  <h2>Ссылки</h2>
                  <ul>
                    {store.URLs.split('\n').map((link: string, index: number) => (
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
