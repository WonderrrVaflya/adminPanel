import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "../types";

interface StoreFormProps {
  onAddStore: (store: Store) => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ onAddStore }) => {
  const [form] = Form.useForm();

  const onFinish = (values: Omit<Store, "ID" | "URLs">) => {
    const newStore: Store = {
      Name: values.Name,
      URLs: "",
      tasks: [],
      ID: "",
    };
    onAddStore(newStore);
    form.resetFields();
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col span={16}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="Name"
            label="Название Магазина"
            rules={[{ required: true, message: "Введите название магазина!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="Широта" /*rules={[{ required: true, message: 'Введите широту!' }]}*/
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Долгота" /*rules={[{ required: true, message: 'Введите широту!' }]}*/
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Адрес" /*rules={[{ required: true, message: 'Введите широту!' }]}*/
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить магазин
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default StoreForm;
