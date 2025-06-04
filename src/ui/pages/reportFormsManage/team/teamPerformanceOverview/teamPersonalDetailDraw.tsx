import { Pagination, Table } from "antd";
import { Drawer } from "@/components/TXDrawer";
import { useSelector } from "../store";
import TXTable from "@/components/TXTable";

export default function TeamPersonalDetailDraw() {
  const {
    teamOverviewPersonalDrawVisible,
    teamOverviewPersonalDetailDataSource,
    teamOverviewPersonalDetailCurrent,
    teamOverviewPersonalDetailTotal,
    teamOverviewPersonalDetailPageSize,
  } = useSelector((x) => x.state);
  const {
    closeTeamPersonalPerformanceDraw,
    onTeamPersonalPerformanceDrawChangePageSize,
  } = useSelector((x) => x.logic);
  const { runGetTeamReportPersonalOviewerDetail } = useSelector((x) => x.api);
  const teamPersonalDetailColumns = useSelector(
    (x) => x.teamPersonalDetailColumns
  );

  return (
    <Drawer
      title="员工明细"
      width={1200}
      open={teamOverviewPersonalDrawVisible}
      onClose={closeTeamPersonalPerformanceDraw}
      zIndex={2000}
    >
      <TXTable
        scroll={{
          x: 1500,
          y: `calc(100vh - 240px)`,
        }}
        columns={teamPersonalDetailColumns}
        rowKey="id"
        pagination={false}
        tableKey="EMPLOYEE_DETAILS"
        loading={runGetTeamReportPersonalOviewerDetail.loading}
        dataSource={teamOverviewPersonalDetailDataSource}
      />
      <Pagination
        className={"mt-4"}
        // hideOnSinglePage={true}
        align={"end"}
        total={teamOverviewPersonalDetailTotal}
        pageSize={teamOverviewPersonalDetailPageSize}
        current={teamOverviewPersonalDetailCurrent}
        onChange={(page, pageSize) =>
          onTeamPersonalPerformanceDrawChangePageSize(page, pageSize)
        }
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Drawer>
  );
}
