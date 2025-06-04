import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { ILiveDataDealDrawerRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<ILiveDataDealDrawerRecord>[] = [
    {
      title: "客户电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 120,
      dataType: "list",
    },
    {
      title: "客户微信",
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      width: 140,
      dataType: "list",
    },
    {
      title: "客户创建时间",
      dataIndex: "customerCreateTime",
      key: "customerCreateTime",
      width: 160,
    },
    {
      title: "上报时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
    },
    {
      title: "上报总金额",
      dataIndex: "amount",
      key: "amount",
      width: 80,
      render: (text) => (text ? `￥${text}` : "-"),
    },
    {
      title: "成交机构",
      dataIndex: "orgName",
      key: "orgName",
      width: 80,
    },
  ];

  return (
    <TXTable<ILiveDataDealDrawerRecord>
      dataSource={logic.dataSource}
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 220px)",
      }}
      tableKey="REPORT_MANAGE_LIVE_DATA_DEAL_DETAILS"
      rowKey="id"
      columns={columns}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      pagination={{
        ...logic.pagination,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
    />
  );
});
