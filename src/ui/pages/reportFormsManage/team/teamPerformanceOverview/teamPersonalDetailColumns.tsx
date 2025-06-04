import { handleCopy } from "@/utils/tools";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useTeamPersonalDetailColumns = (params: { logic: any }) => {
  const { logic } = params;
  return useMemo<ColumnsType>(
    () => [
      {
        title: "成交金额",
        dataIndex: "amount",
        key: "amount",
        width: "120",
      },
      {
        title: "合作比率",
        dataIndex: "collaborateRatio",
        key: "collaborateRatio",
        width: "120",
        render: (ratio) => {
          return `${ratio || 0}%`;
        },
      },
      {
        title: "合作金额",
        dataIndex: "collaborateAmount",
        key: "collaborateAmount",
        width: "120",
        render: (money) => {
          return `￥${money || 0}`;
        },
      },
      {
        title: "合作人名称",
        dataIndex: "collaboratorName",
        key: "collaboratorName",
        width: "120",
      },
      {
        title: "确认金额",
        dataIndex: "confirmAmount",
        key: "confirmAmount",
        width: "120",
      },
      {
        title: "确认日期",
        dataIndex: "confirmDate",
        key: "confirmDate",
        width: "120",
        render: (_, record) =>
          record.confirmDate
            ? `${dayjs(record.confirmDate).format("YYYY-MM-DD")}`
            : "-",
      },
      {
        title: "客户电话",
        dataIndex: "customerPhoneNumber",
        key: "customerPhoneNumber",
        width: "150",
        render: (phoneNumber: string[]) => {
          if (!phoneNumber?.length) return "-";
          return (
            <div className="w-[150px] wes flex flex-wrap gap-2">
              {phoneNumber?.map?.((phone, index) => {
                return (
                  <span
                    key={index}
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                      handleCopy(phone);
                    }}
                  >
                    {phone}
                  </span>
                );
              })}
            </div>
          );
        },
      },
      {
        title: "成交项名称",
        dataIndex: "dataName",
        key: "dataName",
        width: "120",
      },
      {
        title: "成交状态",
        dataIndex: "dealStatus",
        key: "dealStatus",
        width: "120",
        render: (status: string) => {
          const statusConfig: Record<string, { color: string; text: string }> =
            {
              UN_CONFIRMED: { color: "blue", text: "未确认" },
              CONFIRMED: { color: "success", text: "已确认" },
              CANCELED: { color: "error", text: "已取消" },
            };
          return (
            <Tag color={statusConfig[status]?.color || "default"}>
              {statusConfig[status]?.text || "-"}
            </Tag>
          );
        },
      },
      {
        title: "机构名称",
        dataIndex: "orgName",
        key: "orgName",
        width: "120",
      },
      {
        title: "成交项日期",
        dataIndex: "dealDate",
        key: "dealDate",
        width: "120",
        render: (_, record) =>
          record.dealDate
            ? `${dayjs(record.dealDate).format("YYYY-MM-DD")}`
            : "-",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: "120",
        render: (_, record) =>
          record.createTime
            ? `${dayjs(record.createTime).format("YYYY-MM-DD")}`
            : "-",
      },
    ],
    []
  );
};
