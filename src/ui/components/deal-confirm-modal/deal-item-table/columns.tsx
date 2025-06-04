import { useMemo } from "react";
import { Button, Popconfirm, Space, Tag } from "antd";
import { IDealItem } from "@/components/deal-confirm-modal/types";

export const useColumns = () => {
  return useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "dataName",
        key: "dataName",
      },
      {
        title: "金额",
        dataIndex: "amount",
        key: "amount",
        render: (text: number, record: IDealItem) => {
          return <div>￥{text}</div>;
        },
      },
    ],
    []
  );
};
