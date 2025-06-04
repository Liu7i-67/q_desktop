import { useMemo } from "react";
import { Button, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { RoleAuth } from "@/pages/basic/role/auth";

export const useColumns = (params: { logic: any }) => {
  const { openEditModalUpdate, setUpdateModalData } = params.logic;

  return useMemo(
    () => [
      {
        title: "角色名称",
        dataIndex: "roleName",
        key: "roleName",
        width: 200,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 180,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
        width: 200,
        ellipsis: true,
        render: (text: string) => {
          return (
            <Tooltip placement={"top"} title={text ?? ""}>
              <p className={"max-w-[200px] truncate"}>{text || "-"}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        render: (_: any, record: any) => (
          <Space size={4}>
            {RoleAuth.roleUpdate && (
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
