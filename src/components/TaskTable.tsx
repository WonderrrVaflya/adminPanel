import React from "react";
import { Table, Tag } from "antd";
import { Task } from "../types";

interface TaskTableProps {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "completed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Количество товаров",
      dataIndex: "products_count",
      key: "products_count",
    },
    {
      title: "Начало парса",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Окончание парса",
      dataIndex: "end_time",
      key: "end_time",
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" />;
};

export default TaskTable;
