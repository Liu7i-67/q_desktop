import { useMemo } from "react";
import { Button, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { renderEnable } from "@/pages/basic/employee/columns";
import { ChannelAuth } from "@/pages/channel/channelManage/auth";

export const useColumns = (params: { logic: any }) => {
  const { openEditModalUpdate, setUpdateModalData, getChannelDetail } =
    params.logic;

  return useMemo(
    () => [
      {
        title: "渠道名称",
        dataIndex: "channelName",
        key: "channelName",
        width: 250,
      },
      {
        title: "渠道分类全路径",
        dataIndex: "channelTypeFullName",
        key: "channelTypeFullName",
        width: 300,
        render: (text: string) => {
          return (
            <Tooltip placement={"top"} title={text ?? ""}>
              <p className={"max-w-[300px] truncate"}>{text ?? ""}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "是否启用",
        dataIndex: "enableFlag",
        key: "enableFlag",
        width: 150,
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
        title: "最后修改时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 180,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "操作",
        key: "action",
        width: 100,
        render: (_: any, record: any) => (
          <Space size={2}>
            {ChannelAuth.channelUpdate && (
              <Button
                type="link"
                onClick={() => {
                  setUpdateModalData(record);
                  getChannelDetail(record.id);
                  openEditModalUpdate();
                }}
              >
                编辑
              </Button>
            )}
            <Button type="link" onClick={() => {}} disabled>
              删除
            </Button>
          </Space>
        ),
      },
    ],
    [openEditModalUpdate, setUpdateModalData, getChannelDetail]
  );
};
