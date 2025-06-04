import { useMemo } from "react";
import { Button, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { renderEnable } from "@/pages/basic/employee/columns";
import { PlatformAuth } from "@/pages/mainData/platformManage/auth";

export const useColumns = (params: { logic: any }) => {
  const { openEditModalUpdate, setUpdateModalData } = params.logic;

  return useMemo(
    () => [
      {
        title: "平台名称",
        dataIndex: "platformName",
        key: "platformName",
        width: 200,
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
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 180,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "最后更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 180,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
        width: 300,
        ellipsis: true,
        render: (text: string) => {
          return (
            <Tooltip placement={"top"} title={text ?? ""}>
              <div className={"max-w-[300px] truncate"}>{text || "-"}</div>
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
            {PlatformAuth.platformUpdate && (
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
