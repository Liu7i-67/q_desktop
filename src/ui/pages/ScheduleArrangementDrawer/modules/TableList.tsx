import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Table } from "antd";
import { TableFooter } from "./TableFooter";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;
  return (
    <Table
      dataSource={logic.dataSource}
      loading={computed.loading}
      columns={computed.columns}
      rowKey="userId"
      scroll={{ x: "max-content", y: "calc(100vh - 250px)" }}
      pagination={false}
      size="small"
      bordered
      footer={() => <TableFooter />}
    />
  );
});
