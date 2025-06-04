import { Pagination, Table as AntdTable } from "antd";
import { useSelector } from "./store";
import { useMount } from "@quarkunlimit/react-hooks";

const scroll: any = {
  x: "max-content",
  y: "calc(100vh - 350px)",
};

const Table = () => {
  const { runGetData } = useSelector((x) => x.api);
  const { getData, onChangePageSize } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dataSource, total, pageSize, current } = state;
  const columns = useSelector((x) => x.columns);

  useMount(() => {
    getData();
  });

  return (
    <div>
      <AntdTable
        dataSource={dataSource}
        loading={runGetData.loading}
        scroll={scroll}
        pagination={false}
        columns={columns}
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
