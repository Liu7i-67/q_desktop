import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { ReportCode } from "@/pages/reportFormsManage/types";
import { useMount } from "@quarkunlimit/react-hooks";
import { Table as AntdTable } from "antd";
import { useSelector } from "../store";
import TXTable from "@/components/TXTable";

const Table = () => {
  const { runGetReportPagination } = useSelector((x) => x.api);
  const { getReportOverviewPagination, onChangePageSize } = useSelector(
    (x) => x.logic
  );
  const state = useSelector((x) => x.state);
  const { dataSourceOverview } = state;
  const columnsOverview = useSelector((x) => x.columnsOverview);

  useMount(() => {
    getReportOverviewPagination(ReportCode.Team_Performance_Overview_Schedule);
  });

  return (
    <div>
      <TXTable
        dataSource={dataSourceOverview}
        loading={runGetReportPagination.loading}
        scroll={{
          x: 1000,
          y: "calc(100vh - 400px)",
        }}
        tableKey="TEAM_PERFORMANCE_OVERVIEW"
        rowKey="deptId"
        pagination={false}
        columns={columnsOverview}
        columnSpan={12}
      />
    </div>
  );
};

export default Table;
