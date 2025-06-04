import { useMemo } from "react";
import { Button, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { renderEnable } from "@/pages/basic/employee/columns";
import { cn } from "@/utils/tools";
import { LiveStreamerAuth } from "@/pages/mainData/anchorManage/auth";

export const useColumns = (params: { logic: any }) => {
  const { openEditModalUpdate, setUpdateModalId } = params.logic;

  return useMemo(
    () => [
      {
        title: "主播名称",
        dataIndex: "streamerName",
        key: "streamerName",
        width: 200,
      },
      {
        title: "是否启用",
        dataIndex: "enableFlag",
        key: "enableFlag",
        render: (text: boolean) => {
          return renderEnable(text);
        },
        width: 100,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
        width: 200,
      },
      {
        title: "最后更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
        width: 200,
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo",
        ellipsis: true,
        width: 300,
        render: (text: string) => {
          return (
            <Tooltip title={text ?? ""} placement={"top"}>
              <p className={cn("max-w-[300px] truncate", "cursor-pointer")}>
                {text ?? ""}
              </p>
            </Tooltip>
          );
        },
      },
      {
        title: "操作",
        key: "action",
        width: 200,
        render: (_: any, record: any) => (
          <Space size={4}>
            {LiveStreamerAuth.liveStreamerUpdate && (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setUpdateModalId(record.id);
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
    [openEditModalUpdate, setUpdateModalId]
  );
};
