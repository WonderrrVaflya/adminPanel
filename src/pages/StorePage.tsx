import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store, Material } from '../types';
import { Table, Button, Form, Input, Col, Row } from 'antd';

const StorePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stores/${id}`);
        setStore(response.data);
      } catch (error) {
        console.error('Ошибка получения магазина:', error);
      }
    };

    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/materials?storeId=${id}`);
        setMaterials(response.data);
      } catch (error) {
        console.error('Ошибка получения материалов:', error);
      }
    };

    fetchStore();
    fetchMaterials();
  }, [id]);

  const addMaterial = async (values: any) => {
    try {
      const newMaterial = { ...values, storeId: id, links: [] };
      const response = await axios.post('http://localhost:5000/materials', newMaterial);
      setMaterials([...materials, response.data]);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка добавления материалов:', error);
    }
  };

  const columns = [
    {
      title: 'Категория',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ссылки',
      dataIndex: 'links',
      key: 'links',
      render: (links: string[]) => (
        <ul>
          {links.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Material) => (
        <Button type="link" onClick={() => navigate(`/materials/${record.id}`)}>
          Редактировать
        </Button>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ marginTop: '10px' }}>
        <Col span={20}>
            <div>
            {store && (
                <div>
                <h1>{store.name}</h1>
                <p>Широта: {store.latitude}</p>
                <p>Долгота: {store.longitude}</p>
                <Form form={form} onFinish={addMaterial}>
                    <Form.Item name="name" rules={[{ required: true, message: 'Введите название категории!' }]}>
                    <Input placeholder="Категория" />
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">Добавить категорию</Button>
                    </Form.Item>
                </Form>
                <Table columns={columns} dataSource={materials} rowKey="id" />
                </div>
            )}
            </div>
        </Col>
    </Row>
  );
};

export default StorePage;

