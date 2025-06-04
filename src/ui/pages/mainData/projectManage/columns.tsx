import { useMemo } from "react";
import { Button, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { renderEnable } from "@/pages/basic/employee/columns";
import { ProjectAuth } from "@/pages/mainData/projectManage/auth";

export const useColumns = (params: { logic: any }) => {
  const { openEditModalUpdate, setUpdateModalData } = params.logic;

  return useMemo(
    () => [
      {
        title: "项目名称",
        dataIndex: "projectName",
        key: "projectName",
      },
      {
        title: "项目编码",
        dataIndex: "projectCode",
        key: "projectCode",
      },
      {
        title: "项目分类全路径",
        dataIndex: "typeFullName",
        key: "typeFullName",
      },
      {
        title: "是否启用",
        dataIndex: "enableFlag",
        key: "enableFlag",
        width: 120,
        render: (text: boolean) => {
          return renderEnable(text);
        },
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
        width: 200,
        render: (text: string) => {
          return (
            <Tooltip placement={"top"} title={text ?? ""}>
              <p className={"w-[200px] truncate"}>{text || "-"}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "最后修改时间",
        dataIndex: "updateTime",
        key: "updateTime",
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "操作",
        key: "action",
        render: (_: any, record: any) => (
          <Space size={4}>
            {ProjectAuth.projectUpdate && (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setUpdateModalData(record);
                  openEditModalUpdate();
                }}
              >
                编辑
              </Button>
            )}
            <Button type="link" size="small" danger disabled>
              删除
            </Button>
          </Space>
        ),
      },
    ],
    [openEditModalUpdate, setUpdateModalData]
  );
};
