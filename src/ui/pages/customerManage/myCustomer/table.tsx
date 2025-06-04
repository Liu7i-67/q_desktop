import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useMount } from "@quarkunlimit/react-hooks";
import type { TableProps } from "antd";
import { Table as AntdTable, Pagination } from "antd";
import { useSelector } from "./store";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Table = () => {
  const { runGetData } = useSelector((x) => x.api);
  const { getData, getRegionTree, onChangePageSize } = useSelector(
    (x) => x.logic
  );
  const state = useSelector((x) => x.state);
  const {
    dataSource,
    total,
    pageSize,
    current,
    transtionCustomerSelectedRowKeys,
    transtionCustomerVisible,
  } = state;
  const { handleTranstionCustomerSelectChange } = useSelector((x) => x.logic);
  const columns = useSelector((x) => x.columns);

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: [...transtionCustomerSelectedRowKeys],
    onChange: handleTranstionCustomerSelectChange,
  };

  const scroll: any = {
    x: "max-content",
    y: "calc(100vh - 350px)",
  };

  useMount(() => {
    getData();
    getRegionTree();
  });

  return (
    <div>
      <AntdTable
        dataSource={dataSource}
        loading={runGetData.loading}
        scroll={scroll}
        pagination={false}
        columns={columns as any}
        rowKey={(record) => record.id}
        rowSelection={transtionCustomerVisible ? rowSelection : undefined}
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
