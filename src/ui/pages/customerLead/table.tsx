import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useMount } from "@quarkunlimit/react-hooks";
import { Pagination } from "antd";
import { useSelector } from "./store";
import TXTable from "@/components/TXTable";

const Table = () => {
  const { runGetData } = useSelector((x) => x.api);
  const {
    getData,
    getChannelData,
    getPlatformData,
    getStreamerData,
    getRegionTree,
    onChangePageSize,
  } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dataSource, total, pageSize, current } = state;
  const columns = useSelector((x) => x.columns);

  const scroll: any = {
    x: true,
    y: "calc(100vh - 280px)",
  };

  useMount(() => {
    getData();
    // getChannelData();
    getPlatformData();
    // getStreamerData();
    getRegionTree();
  });

  return (
    <div>
      <TXTable
        dataSource={dataSource}
        loading={runGetData.loading}
        scroll={scroll}
        pagination={false}
        rowKey="id"
        tableKey="CUSTOMER_LEAD"
        columns={columns as any}
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
