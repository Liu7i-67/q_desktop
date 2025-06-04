import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { IConsultOrder } from "../interface";
import { IPagination } from "@/utils/interface";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";
import { TXTextCell } from "@/components/TXTableRender/TXTextCell";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<IConsultOrder>[] = [
    {
      title: "咨询师",
      width: 240,
      dataIndex: "userName",
      key: "userName",
      render: (text: string) => {
        return <TXTextCell text={text} className="min-w-[240px] w-full" />;
      },
    },
    {
      title: "接单数量",
      width: 240,
      dataIndex: "numberOfCustomerAssignedToday",
      key: "numberOfCustomerAssignedToday",
    },
  ];

  return (
    <TXTable<IConsultOrder>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="CONSULT_ORDER"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 300px)",
      }}
    />
  );
});
