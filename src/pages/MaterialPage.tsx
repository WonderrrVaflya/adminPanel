import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Material } from '../types';
import { Table, Button, Form, Input, Col, Row } from 'antd';

const MaterialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/materials/${id}`);
        setMaterial(response.data);
      } catch (error) {
        console.error('Ошибка получения материалов:', error);
      }
    };

    fetchMaterial();
  }, [id]);

  const addLink = async (values: any) => {
    try {
      if (material) {
        const updatedMaterial = { ...material, links: [...material.links, values.link] };
        await axios.put(`http://localhost:5000/materials/${id}`, updatedMaterial);
        setMaterial(updatedMaterial);
        form.resetFields();
      }
    } catch (error) {
      console.error('Ошибка добаволения ссыоки:', error);
    }
  };

  const removeLink = async (linkToRemove: string) => {
    try {
      if (material) {
        const updatedLinks = material.links.filter(link => link !== linkToRemove);
        const updatedMaterial = { ...material, links: updatedLinks };
        await axios.put(`http://localhost:5000/materials/${id}`, updatedMaterial);
        setMaterial(updatedMaterial);
      }
    } catch (error) {
      console.error('Ошибка удаления ссылки:', error);
    }
  };

  const columns = [
    {
      title: 'Ссылка',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: { link: string }) => (
        <Button type="text" danger onClick={() => removeLink(record.link)}>
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
        <Col span={20}>
            <div>
            {material && (
                <div>
                <h1>{material.name}</h1>
                <Form form={form} onFinish={addLink}>
                    <Form.Item name="link" rules={[{ required: true, message: 'Добавьте ссылку!' }]}>
                    <Input placeholder="Ссылка" />
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">Добавить</Button>
                    </Form.Item>
                </Form>
                <Table columns={columns} dataSource={material.links.map(link => ({ link }))} rowKey="link" />
                </div>
            )}
            </div>
        </Col>
    </Row>
  );
};

export default MaterialPage;

