import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { ReportCode } from "@/pages/reportFormsManage/types";
import { useMount } from "@quarkunlimit/react-hooks";
import { Table as AntdTable } from "antd";
import { useSelector } from "../store";
import TXTable from "@/components/TXTable";

const Table = () => {
  const { runGetReportPagination } = useSelector((x) => x.api);
  const { getReportDetailPagination } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dataSourceDetail } = state;
  const columnsDetail = useSelector((x) => x.columnsDetail);

  useMount(() => {
    getReportDetailPagination(ReportCode.Team_Performance_Schedule);
  });

  return (
    <div>
      <TXTable
        dataSource={dataSourceDetail}
        loading={runGetReportPagination.loading}
        tableKey="TEAM_PERFORMANCE_DETAIL"
        scroll={{
          x: "max-content",
          y: "calc(100vh - 350px)",
        }}
        pagination={false}
        rowKey="createDate"
        columns={columnsDetail}
      />
    </div>
  );
};

export default Table;
