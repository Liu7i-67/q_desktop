import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useMount } from "@quarkunlimit/react-hooks";
import { Pagination, Table as AntdTable } from "antd";
import { useSelector } from "./store";
import TXTable from "@/components/TXTable";

const Table = () => {
  const { runGetData } = useSelector((x) => x.api);
  const { getData, onChangePageSize } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dataSource, total, pageSize, current } = state;
  const columns = useSelector((x) => x.columns);
  const { scrollY } = usePageTableScrollY();

  useMount(() => {
    getData();
  });

  return (
    <div>
      <TXTable
        dataSource={dataSource}
        loading={runGetData.loading}
        scroll={{
          x: "max-content",
          y: `calc(100vh - 340px)`,
        }}
        tableKey="PLATFORM_MANAGE"
        pagination={false}
        columns={columns}
        rowKey="id"
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
