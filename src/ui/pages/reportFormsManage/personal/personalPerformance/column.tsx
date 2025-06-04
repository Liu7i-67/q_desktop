import { useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import dayjs from "dayjs";
import { handleCopy } from "@/utils/tools";

interface DataType {
  createTime: string;
  dealDate: string;
  dealAmount: number;
  collaborateRatio: number;
  dealStatus: "UN_CONFIRMED" | "CONFIRMED" | "CANCELED";
  dealOrgName: string;
  dealProjectName: string;
  createUserName: string;
}

export const useColumns = () => {
  return useMemo<ColumnsType<DataType>>(
    () => [
      {
        title: "提交时间",
        dataIndex: "createTime",
        key: "createTime",
        render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
        width: 180,
      },
      {
        title: "成交时间",
        dataIndex: "dealDate",
        key: "dealDate",
        render: (text) => dayjs(text).format("YYYY-MM-DD"),
        width: 120,
      },
      {
        title: "成交金额",
        dataIndex: "dealAmount",
        key: "dealAmount",
        render: (text) => `¥${text?.toLocaleString()}`,
        align: "right",
        width: 120,
      },
      {
        title: "客户电话",
        dataIndex: "customerPhoneNumbers",
        key: "customerPhoneNumbers",
        width: 160,
        render: (text: string[]) => {
          return (
            <div className="w-[160px] flex flex-wrap gap-1">
              {text.map((p, index) => {
                return (
                  <span
                    key={index}
                    className={"hover:underline hover:cursor-pointer"}
                    onClick={() => {
                      handleCopy(p);
                    }}
                  >
                    {p}
                  </span>
                );
              })}
            </div>
          );
        },
      },
      {
        title: "分成比例(%)",
        dataIndex: "collaborateRatio",
        key: "collaborateRatio",
        render: (text) => `${text}%`,
        align: "right",
        width: 120,
      },
      {
        title: "客户微信",
        dataIndex: "customerWechatNumbers",
        key: "customerWechatNumbers",
        width: 160,
        render: (text: string[]) => {
          return (
            <div className="w-[160px] flex flex-wrap gap-1 wes">
              {text.map((p, index) => {
                return (
                  <div
                    key={index}
                    className={"hover:underline hover:cursor-pointer wes"}
                    onClick={() => {
                      handleCopy(p);
                    }}
                  >
                    {p}
                  </div>
                );
              })}
            </div>
          );
        },
      },
      {
        title: "确认状态",
        dataIndex: "dealStatus",
        key: "dealStatus",
        width: 100,
        render: (status) => {
          const statusMap: { [key: string]: { text: string; color: string } } =
            {
              UN_CONFIRMED: { text: "未确认", color: "warning" },
              CONFIRMED: { text: "已确认", color: "success" },
              CANCELED: { text: "已取消", color: "error" },
            };
          const { text, color } = statusMap[status] || {
            text: "未知",
            color: "default",
          };
          return <Tag color={color}>{text}</Tag>;
        },
      },
      {
        title: "成交机构",
        dataIndex: "dealOrgName",
        key: "dealOrgName",
        ellipsis: true,
        width: 160,
      },
      {
        title: "成交项目",
        dataIndex: "dealProjectName",
        key: "dealProjectName",
        ellipsis: true,
        width: 160,
      },
      {
        title: "成交提交人",
        dataIndex: "createUserName",
        key: "createUserName",
        width: 120,
      },
    ],
    []
  );
};
