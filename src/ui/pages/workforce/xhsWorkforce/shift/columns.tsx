import { useMemo } from "react";
import { Button, Popconfirm, Space, Tag } from "antd";
import { system2timeQuantum } from "@/utils/tools";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";
import { TXTag } from "@/components/TXTag";

export interface IRecord {
  createTime: string;
  endTime: string;
  frontendExtension: string;
  id: string;
  scheduleType: number;
  shiftName: string;
  startTime: string;
  updateTime: string;
}

export const useColumns = (params: { logic: any; runDeleteShift: any }) => {
  const { openEditModalUpdate, deleteShift, setUpdateModalData } = params.logic;
  const { runDeleteShift } = params;

  return useMemo(
    () => [
      {
        title: "班次名称",
        dataIndex: "shiftName",
        key: "shiftName",
        width: 120,
        render: (text: string, record: IRecord) => {
          return (
            <TXTag text={text} color={record.frontendExtension || undefined} />
          );
        },
      },
      {
        title: "排班类型",
        dataIndex: "scheduleType",
        key: "scheduleType",
        width: 120,
        render: () => "小红书排班",
      },
      {
        title: "时间段",
        dataIndex: "timeSlot",
        key: "timeSlot",
        width: 180,
        render: (timeSlot: string, record: IRecord) => (
          <>
            <Tag>{record.startTime}</Tag>
            <span className="mr-2">-</span>
            <Tag>{record.endTime}</Tag>
          </>
        ),
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 180,
      },
      {
        title: "最后修改时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 180,
      },
      {
        title: "操作",
        key: "action",
        width: 120,
        render: (_: any, record: any) => (
          <Space>
            {RedBookSchedulingAuth.redBookSchedulingShiftUpdate && (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  openEditModalUpdate(record);
                  setUpdateModalData(record);
                }}
              >
                编辑
              </Button>
            )}
            {RedBookSchedulingAuth.redBookSchedulingShiftDelete && (
              <Popconfirm
                title="确定要删除这个班次吗？"
                onConfirm={() => {
                  deleteShift([record.id]);
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="link"
                  size="small"
                  danger
                  loading={runDeleteShift.loading}
                >
                  删除
                </Button>
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ],
    [openEditModalUpdate, deleteShift, setUpdateModalData]
  );
};
