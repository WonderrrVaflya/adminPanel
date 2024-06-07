import React from 'react';
import { Button, Form, Input } from 'antd';
import { Store } from '../types';

interface StoreFormProps {
  onAddStore: (store: Store) => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ onAddStore }) => {
  const [form] = Form.useForm();

  const onFinish = (values: Omit<Store, 'id' | 'links'>) => {
    const newStore: Store = {
      id: Date.now().toString(),
      ...values,
      links: [],
    };
    onAddStore(newStore);
    form.resetFields();
  };

  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
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
        <Button type="primary" htmlType="submit">Добавить магазин</Button>
      </Form.Item>
    </Form>
  );
};

export default StoreForm;
