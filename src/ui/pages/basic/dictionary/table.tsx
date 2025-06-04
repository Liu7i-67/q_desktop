import TXTable from "@/components/TXTable";
import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useSelector } from "@/pages/basic/dictionary/store";
import { useMount } from "@quarkunlimit/react-hooks";
import { Pagination, Table as AntdTable } from "antd";

const Table = () => {
  const { runGetData } = useSelector((x) => x.api);
  const { getData, onDictTableChange } = useSelector((x) => x.logic);
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
          y: "calc(100vh - 300px)",
        }}
        tableKey="BASIC_DICTIONARY"
        pagination={false}
        rowKey="id"
        columns={columns}
      />
      <Pagination
        className={"mt-4"}
        // hideOnSinglePage={true}
        align={"end"}
        total={total}
        pageSize={pageSize}
        current={current}
        showSizeChanger={true}
        onChange={(page, pageSize) => {
          onDictTableChange(page, pageSize);
        }}
      />
    </div>
  );
};

export default Table;
