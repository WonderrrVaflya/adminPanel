import React from "react";
import { Table, Button, Popover } from "antd";
import { Store } from "../types";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface StoreListProps {
  stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  const navigate = useNavigate();

  const startParser = async (ID:string) => {
    try {
      if (ID) {
        const foundStore = stores.find(
          (store: Store) =>store.ID.toString() === ID
        );
        if (foundStore) {
          await axios.post(
            "https://parsertovarov-6b40c4ac317f.herokuapp.com/parse",
            { name: foundStore.Name }
          );
        } 
      }
    } catch (error) {
      console.error("Ошибка запуска парсера:", error);
    }
  };

  const columns = [
    {
      title: "Название магазина",
      dataIndex: "Name",
      key: "name",
      render: (text: string, record: Store) => (
        <>
          <Popover
            content={
              <div>
                <Button
                  type="link" onClick={() => startParser(record.ID)}
                >
                  {record.active ? "Остановить" : "Запустить"}
                </Button>
              </div>
            }
            trigger="click"
          >
            <SettingOutlined style={{ marginRight: 10 }} />
          </Popover>
          <span
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => navigate(`/stores/${record.ID}`)}
          >
            {text}
          </span>
        </>
      ),
    },
    {
      title: "Количество товаров",
      dataIndex: "itemCount",
      key: "itemCount",
    },
    {
      title: "Запарсено за сегодня",
      dataIndex: "scrapedItemCount",
      key: "scrapedItemCount",
    },
    {
      title: "Активность",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <span>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: active ? "green" : "red",
            }}
          ></span>
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={stores} rowKey="ID" />;
};

export default StoreList;
