import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useTeamChannelColumn = (params: { logic: any }) => {
  const { logic } = params;
  return useMemo<ColumnsType>(
    () => [
      {
        title: "渠道名称",
        dataIndex: "channelName",
        key: "channelName",
        width: "120",
      },
      {
        title: "统计日期",
        dataIndex: "startStatTime",
        key: "startStatTime",
        width: "120",
        render: (_, record) =>
          `${dayjs(record.startStatTime).format("YYYY-MM-DD")} ~ ${dayjs(
            record.endStatTime
          ).format("YYYY-MM-DD")}`,
      },
      {
        title: "上报金额",
        dataIndex: "gmvOfCreate",
        key: "gmvOfCreate",
        width: "120",
        render: (text) => `¥${text?.toLocaleString()}`,
      },
      {
        title: "成交单量",
        dataIndex: "numberOfBillingDealt",
        key: "numberOfBillingDealt",
        width: "120",
      },
      {
        title: "派单数量",
        dataIndex: "numberOfCustomerDispatched",
        key: "numberOfCustomerDispatched",
        width: "120",
      },
      // {
      //   title: "线索数量",
      //   dataIndex: "numberOfCustomerLead",
      //   key: "numberOfCustomerLead",
      //   width: "120",
      // },
      {
        title: "客户数-按客户创建时间",
        dataIndex: "numberOfCustomerByCustomerCreateTime",
        key: "numberOfCustomerByCustomerCreateTime",
        width: "120",
      },
    ],
    []
  );
};
