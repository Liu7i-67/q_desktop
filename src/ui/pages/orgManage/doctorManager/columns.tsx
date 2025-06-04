import { useMemo } from "react";
import { Button, Popconfirm, Space, Tag } from "antd";

export const useColumns = (params: { logic: any; runDeleteDoctor: any }) => {
  const { openEditModalUpdate, deleteDoctor, setUpdateModalId } = params.logic;
  const { runDeleteDoctor } = params;

  return useMemo(
    () => [
      {
        title: "医生姓名",
        dataIndex: "doctorName",
        key: "doctorName",
        width: 120,
      },
      {
        title: "任职机构",
        dataIndex: "orgName",
        key: "orgName",
        width: 160,
        render: (orgName: string) => (
          <Space direction="vertical" size={4}>
            {orgName?.split(",").map((name, index) => (
              <Tag color="default" key={index}>
                {name.trim()}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: "学历",
        dataIndex: "diplomaName",
        key: "diplomaName",
        width: 120,
      },
      {
        title: "医生职称",
        dataIndex: "title",
        key: "title",
        width: 120,
        render: (title: string) => title || "-",
      },
      {
        title: "工龄",
        dataIndex: "hireDate",
        key: "hireDate",
        width: 100,
        render: (hireDate: string) => {
          if (!hireDate) return "-";
          const years = Math.floor(
            (new Date().getTime() - new Date(hireDate).getTime()) /
              (365 * 24 * 60 * 60 * 1000)
          );
          return `${years}年`;
        },
      },
      {
        title: "医生类型",
        dataIndex: "doctorType",
        key: "doctorType",
        width: 120,
        render: (type: string) => {
          const typeMap: Record<string, { text: string; color: string }> = {
            ANESTHETIST: { text: "麻醉师", color: "blue" },
            DOCTOR: { text: "医生", color: "cyan" },
          };
          return (
            <Tag color={typeMap[type]?.color}>
              {typeMap[type]?.text || type}
            </Tag>
          );
        },
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        render: (_: any, record: any) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => {
                openEditModalUpdate(record);
                setUpdateModalId(record.id);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除这个医生吗？"
              onConfirm={() => {
                deleteDoctor([record.id]);
              }}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                size="small"
                danger
                loading={runDeleteDoctor.loading}
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [openEditModalUpdate, deleteDoctor, setUpdateModalId]
  );
};
