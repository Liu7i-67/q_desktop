import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Table, TableColumnsType } from "antd";
import { IPagination } from "@/utils/interface";
import { IHistoricalDispatchingRecord } from "../interface";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: TableColumnsType<IHistoricalDispatchingRecord> = [
    {
      title: "派单时间",
      width: 120,
      dataIndex: "dispatchDateText",
      key: "dispatchDateText",
    },
    {
      title: "派单机构",
      width: 120,
      dataIndex: "orgName",
      key: "orgName",
    },
    {
      title: "派单电话",
      width: 120,
      dataIndex: "dispatchPhone",
      key: "dispatchPhone",
    },
    {
      title: "派单人",
      width: 120,
      dataIndex: "createdUserName",
      key: "createdUserName",
    },
    {
      title: "派单状态",
      width: 120,
      dataIndex: "dispatchStatusLabel",
      key: "dispatchStatusLabel",
    },
  ];

  return (
    <Table<IHistoricalDispatchingRecord>
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
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 440px)",
      }}
    />
  );
});
