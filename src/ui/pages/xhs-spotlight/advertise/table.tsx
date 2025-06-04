import { Pagination, Table as AntdTable } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useMount } from "@quarkunlimit/react-hooks";
import { useSelector } from "./store";
import TXTable from "@/components/TXTable";

const Table = () => {
  const { runGetAdvertiser } = useSelector((x) => x.api);
  const { getData, onChangePageSize, handleSetSelectedRowKeys } = useSelector(
    (x) => x.logic
  );
  const { dataSource, total, pageSize, current } = useSelector((x) => x.state);
  const columns = useSelector((x) => x.columns);

  const rowSelection: TableProps<any>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      handleSetSelectedRowKeys(selectedRowKeys);
    },
  };

  const scroll: any = {
    x: 1000,
    y: "calc(100vh - 350px)",
  };

  useMount(() => {
    getData();
  });

  return (
    <div>
      <TXTable
        dataSource={dataSource}
        loading={runGetAdvertiser.loading}
        scroll={scroll}
        pagination={false}
        tableKey="XHSSPOTLIGHT_ADVERTISE"
        columns={columns as any}
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
      />
      <Pagination
        className={"mt-4"}
        // hideOnSinglePage={true}
        align={"end"}
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={(page, pageSize) => onChangePageSize(page, pageSize)}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default Table;
