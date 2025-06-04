import { Pagination, Table } from "antd";
import { Drawer } from "@/components/TXDrawer";
import { useSelector } from "../store";
import { TeamDetailDrawOption } from "./TeamDetailDrawOption";
import TXTable from "@/components/TXTable";

export default function TeamDetailDra() {
  const {
    teamOverviewDetailDrawVisible,
    teamOverviewDetailDataSource,
    teamOverviewDetailCurrent,
    teamOverviewDetailTotal,
    teamOverviewDetailPageSize,
  } = useSelector((x) => x.state);
  const {
    closeTeamPerformanceDraw,
    onTeamPerformanceDrawChangePageSize,
    onTeamPerformanceDrawChangeSort,
  } = useSelector((x) => x.logic);
  const { runGetTeamReportOviewerDetail } = useSelector((x) => x.api);
  const teamDetailColumns = useSelector((x) => x.teamDetailColumns);

  return (
    <Drawer
      title="组内明细"
      extra={<TeamDetailDrawOption />}
      width={1500}
      open={teamOverviewDetailDrawVisible}
      destroyOnClose={true}
      onClose={closeTeamPerformanceDraw}
    >
      <TXTable
        scroll={{
          x: "max-content",
          y: `calc(100vh - 240px)`,
        }}
        columns={teamDetailColumns}
        rowKey="userId"
        pagination={false}
        tableKey="TEAM_PERFORMANCE_OVERVIEW_DETAIL"
        columnSpan={12}
        loading={runGetTeamReportOviewerDetail.loading}
        onChange={(_, __, e) => {
          onTeamPerformanceDrawChangeSort(Array.isArray(e) ? e[0] : e);
        }}
        dataSource={teamOverviewDetailDataSource}
      />
      <Pagination
        className={"mt-4"}
        // hideOnSinglePage={true}
        align={"end"}
        total={teamOverviewDetailTotal}
        pageSize={teamOverviewDetailPageSize}
        current={teamOverviewDetailCurrent}
        onChange={(page, pageSize) =>
          onTeamPerformanceDrawChangePageSize(page, pageSize)
        }
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Drawer>
  );
}
