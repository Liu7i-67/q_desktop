import TXTable from "@/components/TXTable";
import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useSelector } from "@/pages/basic/employee/store";
import { useMount } from "@quarkunlimit/react-hooks";
import { Pagination, Table as AntdTable } from "antd";

const Table = () => {
  const { runGetPage, runResetPsw } = useSelector((x) => x.api);
  const { getPage, onChangePageSize } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const columns = useSelector((x) => x.columns);
  const { dataSource, total, current, pageSize } = state;
  const { scrollY } = usePageTableScrollY();

  useMount(() => {
    getPage();
  });

  return (
    <div>
      <TXTable
        scroll={{
          x: "max-content",
          y: "calc(100vh - 300px)",
        }}
        dataSource={dataSource}
        pagination={false}
        tableKey="BASIC_EMPLOYEE"
        columns={columns}
        rowKey="id"
        loading={runGetPage.loading || runResetPsw.loading}
      />
      <Pagination
        total={total}
        className={"mt-4"}
        align={"end"}
        current={current}
        pageSize={pageSize}
        onChange={(page, pageSize) => {
          onChangePageSize(page, pageSize);
        }}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default Table;
