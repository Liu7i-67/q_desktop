import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { ILiveDataDetailSecondRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<ILiveDataDetailSecondRecord>[] = [
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
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
    },
    {
      title: "客户类型",
      dataIndex: "customerTypeStr",
      key: "customerTypeStr",
      width: 80,
    },
    {
      title: "客户状态",
      dataIndex: "customerStatus",
      key: "customerStatus",
      width: 80,
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: {
            EMPTY: { color: "default", text: "-" },
            IN_PROGRESS: { color: "processing", text: "开发中" },
            DEAL: { color: "success", text: "成交" },
            REPEAT_PURCHASE: { color: "blue", text: "复购" },
          },
        },
      },
    },
  ];

  return (
    <TXTable<ILiveDataDetailSecondRecord>
      dataSource={logic.dataSource}
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 220px)",
      }}
      tableKey="REPORT_MANAGE_LIVE_DATA_CUSTOMER_DETAILS"
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
