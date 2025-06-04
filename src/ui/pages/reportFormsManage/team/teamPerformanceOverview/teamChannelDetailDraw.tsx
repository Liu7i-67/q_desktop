import { Pagination, Table } from "antd";
import { Drawer } from "@/components/TXDrawer";
import { useSelector } from "../store";
import TXTable from "@/components/TXTable";

export default function TeamChannelDetailDraw() {
  const {
    teamChannelDrawVisible,
    teamChannelDrawDataSource,
    teamChannelDrawCurrent,
    teamChannelDrawTotal,
    teamChannelDrawPageSize,
  } = useSelector((x) => x.state);
  const { closeTeamChannelDraw, onTeamChannleDetalDrawChangePageSize } =
    useSelector((x) => x.logic);
  const { runGetTeamChannleDetail } = useSelector((x) => x.api);
  const teamChannleColumn = useSelector((x) => x.teamChannleColumn);

  return (
    <Drawer
      title="渠道详情"
      width={1200}
      open={teamChannelDrawVisible}
      onClose={closeTeamChannelDraw}
    >
      <TXTable
        scroll={{
          x: 1500,
          y: `calc(100vh - 240px)`,
        }}
        columns={teamChannleColumn}
        rowKey="id"
        tableKey="REPORTFORMSMANAGE_TEAM_DETAIL"
        pagination={false}
        loading={runGetTeamChannleDetail.loading}
        dataSource={teamChannelDrawDataSource}
      />
      <Pagination
        className={"mt-4"}
        align={"end"}
        total={teamChannelDrawTotal}
        pageSize={teamChannelDrawPageSize}
        current={teamChannelDrawCurrent}
        onChange={(page, pageSize) =>
          onTeamChannleDetalDrawChangePageSize(page, pageSize)
        }
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Drawer>
  );
}
