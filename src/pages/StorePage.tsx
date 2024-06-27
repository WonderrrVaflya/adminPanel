import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../types";
import { Button, Form, Input, Col, Row } from "antd";
import TaskTable from "../components/TaskTable";

const StorePage: React.FC = () => {
  const { ID } = useParams<{ ID: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get<Store[]>(
          'https://parsertovarov-6b40c4ac317f.herokuapp.com/sites'
        );
        const foundStore = response.data.find(
          (store: Store) =>store.ID.toString() === ID
        );
        if (foundStore) {
          setStore(foundStore);
        } else {
          setError(`Магазин с ID ${ID} не найден.`);
        }
      } catch (error) {
        setError("Ошибка получения магазина.");
        console.error("Ошибка получения магазина:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [ID]);

  const addLinks = async (values: any) => {
    try {
      const newLinks = values.links
        .split("\n")
        .filter((link: string) => link.trim() !== "");
      const updatedLinks = store?.URLs
        ? store.URLs + "\n" + newLinks.join("\n")
        : newLinks.join("\n");
      const updatedStore = { ...store, URLs: updatedLinks };
      await axios.put(
        `https://parsertovarov-6b40c4ac317f.herokuapp.com/sites/123`,
        updatedStore
      );
      setStore(updatedStore as Store);
      form.resetFields();
    } catch (error) {
      console.error("Ошибка добавления ссылок:", error);
    }
  };


  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldsValue({ links: e.target.value });
  };

  return (
    <Row justify="center" style={{ marginTop: "10px" }}>
      <Col span={20}>
        <div>
          {loading && <p>Загрузка...</p>}
          {error && <p>{error}</p>}
          {store && (
            <div>
              <h1>{store.Name}</h1>
              <p>
                Адрес: <b>{store.address}</b>
              </p>
              <p>
                Широта: <b>{store.latitude}</b>
              </p>
              <p>
                Долгота: <b>{store.longitude}</b>
              </p>
              <h2>Добавить ссылки</h2>
              <Form form={form} onFinish={addLinks}>
                <Form.Item
                  name="links"
                  rules={[{ required: true, message: "Введите ссылки!" }]}
                  initialValue={store.URLs}
                >
                  <Input.TextArea
                    rows={10}
                    placeholder="Вставьте ссылки здесь, по одной на строку"
                    onChange={handleTextAreaChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Добавить ссылки
                  </Button>
                </Form.Item>
              </Form>
              <h2>Задачи</h2>
              <TaskTable tasks={store.tasks} />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default StorePage;

