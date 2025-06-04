import TXTable from "@/components/TXTable";
import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useSelector } from "@/pages/reportFormsManage/liveData/store";
import { Table as AntdTable, Pagination } from "antd";

const Table = () => {
  const columns = useSelector((x) => x.columns);

  const state = useSelector((x) => x.state);

  const { dataSource, size, page, total } = state;

  const { getTableData, handleChangeSort } = useSelector((x) => x.logic);

  const { runGetLiveData } = useSelector((x) => x.api);

  return (
    <>
      <TXTable
        pagination={false}
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        loading={runGetLiveData.loading}
        rowKey="liveStreamerId"
        tableKey="REPORTFORMS_MANAGE_LIVE_DATA"
        onChange={(p, f, sorter) => {
          handleChangeSort(Array.isArray(sorter) ? sorter[0] : sorter);
        }}
        scroll={{
          x: true,
          y: "calc(100vh - 340px)",
        }}
      />
      <Pagination
        className="flex justify-end mt-4"
        current={page}
        pageSize={size}
        total={total}
        showSizeChanger
        showTotal={(total) => `共 ${total} 条`}
        onChange={(page: number, size: number) => {
          getTableData(page, size);
        }}
      />
    </>
  );
};

export default Table;
