import TXTable from "@/components/TXTable";
import { IPagination } from "@/utils/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { IExcuteStartegy } from "../interface";
import { useStore } from "../store/RootStore";
import { ITXColumnType } from "@/components/TXTable/interface";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: ITXColumnType<IExcuteStartegy>[] = [
    {
      title: "策略名称",
      dataIndex: "strategyName",
      key: "strategyName",
      width: 200,
    },
    {
      title: "策略描述",
      width: 800,
      dataIndex: "strategyDesc",
      key: "strategyDesc",
      dataType: "textarea",
      dataExtraProps: {
        textarea: {
          row: 3,
          contentClass: "w-[600px]",
        },
      },
    },
    {
      title: "创建人",
      dataIndex: "createUserName",
      key: "createUserName",
      width: 200,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: 160,
      key: "createTime",
    },
  ];

  return (
    <TXTable<IExcuteStartegy>
      tableKey="MY_EXCUTE_STARTEGY"
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      size="small"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
