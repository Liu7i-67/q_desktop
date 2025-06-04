import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, Space, Table, TableColumnsType, Tag } from "antd";
import { ITransactionRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import {
  dealStatusInfo,
  TDealStatus,
} from "@/service/business/v1/customer-deal/get-page";
import { TXTagStrs } from "@/components/TXTableRender/TXTagStrs";
import { TXTime } from "@/components/TXTableRender/TXTime";
import { formatCurrency } from "@/utils/tools";
import { CustomerDrawerAuth } from "../../auth";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<ITransactionRecord> = [
    {
      title: "成交状态",
      dataIndex: "dealStatus",
      key: "dealStatus",
      width: 100,
      render: (status: TDealStatus) => {
        const info = dealStatusInfo[status || "DEFAULT"];
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: "机构名称",
      dataIndex: "orgName",
      key: "orgName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "成交项目",
      dataIndex: "dataNames",
      key: "dataNames",
      width: 150,
      render: (dataNames) => (
        <TXTagStrs className="w-[150px]" str={dataNames} />
      ),
    },
    {
      title: "处理备注",
      dataIndex: "operateMemo",
      key: "operateMemo",
      width: 110,
      render: (memo) => memo || "-",
    },
    {
      title: "上报人",
      dataIndex: "createUserName",
      key: "createUserName",
      width: 110,
    },
    {
      title: "上报时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 110,
      render: (time: string) => <TXTime time={time} />,
    },
    {
      title: "成交时间",
      dataIndex: "dealDate",
      key: "dealDate",
      width: 110,
      render: (time: string) => <TXTime time={time} />,
    },
    {
      title: "确认时间",
      dataIndex: "confirmDate",
      key: "confirmDate",
      width: 110,
      render: (time: string) => <TXTime time={time} />,
    },
    {
      title: "成交金额",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (amount: string) => formatCurrency(amount),
    },
    {
      title: "操作",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <a
            onClick={() => {
              logic.recordAction(record, "DETAIL");
            }}
          >
            详情
          </a>
          {record.dealStatus !== "CONFIRMED" &&
            CustomerDrawerAuth.customerDealDelete && (
              <a
                className="text-red-600"
                onClick={() => {
                  logic.recordAction(record, "DELETE");
                }}
              >
                删除
              </a>
            )}
        </Space>
      ),
    },
  ];

  return (
    <TXTable<ITransactionRecord>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      tableKey="MY_CUSTOMER_TRANSACTION_RECORD"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 300px)",
      }}
    />
  );
});
