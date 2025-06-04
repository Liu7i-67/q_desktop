import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Tag, Table } from "antd";
import { handleCopy } from "@/utils/tools";
import type { TableProps } from "antd";
import { WechatStatus, CustomerStatus } from "../interface";
import { Key } from "react";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const mergeColumns = [
    {
      title: "客户归属人",
      dataIndex: "ownerName",
      key: "ownerName",
      width: 120,
    },
    {
      title: "创建/报备时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
    },
    {
      title: "客户微信",
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      width: 100,
      render: (wechatNumber: string[]) => {
        return wechatNumber.map((wechat) => {
          return (
            <p
              className={"hover:underline hover:cursor-pointer"}
              onClick={() => {
                handleCopy(wechat);
              }}
            >
              {wechat || "-"}
            </p>
          );
        });
      },
    },
    {
      title: "客户电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumbers: string[]) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {phoneNumbers?.map((phone, index) => (
            <span
              className={"hover:underline hover:cursor-pointer"}
              onClick={() => {
                handleCopy(phone);
              }}
              key={index}
            >
              {phone}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "微信通过状态",
      dataIndex: "wechatStatus",
      key: "wechatStatus",
      render: (status: WechatStatus) => {
        const statusMap: { [key: string]: React.ReactNode } = {
          [WechatStatus.UN_PASSED]: <Tag color="error">未通过</Tag>,
          [WechatStatus.PASSED]: <Tag color="success">已通过</Tag>,
          [WechatStatus.UN_DEFINED]: <Tag color="cyan">待定中</Tag>,
        };
        return statusMap[status] || <Tag color="cyan">待定中</Tag>;
      },
    },
    {
      title: "客户状态",
      dataIndex: "customerStatus",
      key: "customerStatus",
      render: (status: CustomerStatus) => {
        const statusMap: { [key: string]: React.ReactNode } = {
          [CustomerStatus.EMPTY]: "-",
          [CustomerStatus.IN_PROGRESS]: <Tag color="processing">开发中</Tag>,
          [CustomerStatus.DEAL]: <Tag color="success">成交</Tag>,
          [CustomerStatus.REPEAT_PURCHASE]: <Tag color="blue">复购</Tag>,
        };
        return statusMap[status] || status;
      },
    },
  ];

  const rowSelection: TableRowSelection<IResBusinessV1CustomerGetPage> = {
    type: "radio",
    selectedRowKeys: [...logic.mergeCustomerSelectedRowKeys],
    onChange: (key: Key[]) =>
      logic.handleMergeCustomerSelectChange(key as string[]),
  };

  return (
    <Table
      dataSource={logic.mergeCustomerTableData}
      loading={computed.onMergeCustomerSearchLoading}
      pagination={false}
      columns={mergeColumns}
      rowSelection={rowSelection}
      rowKey={(record) => record.id}
    />
  );
});
