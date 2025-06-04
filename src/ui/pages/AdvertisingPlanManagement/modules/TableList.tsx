import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { IAdvertisingPlanManagement } from "../interface";
import { IPagination } from "@/utils/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";
import { AdvertisingPlanManagementAuth } from "../auth";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: ITXColumnType<IAdvertisingPlanManagement>[] = [
    {
      title: "广告计划名称",
      width: 240,
      dataIndex: "campaignName",
      key: "campaignName",
    },
    {
      title: "所属渠道",
      width: 240,
      dataIndex: "channelName",
      key: "channelName",
    },
    {
      title: "负责人",
      width: 240,
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "创建时间",
      width: 240,
      dataIndex: "createTime",
      key: "createTime",
      dataType: "datetime",
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      width: 120,
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <TXTableAction
                className="w-[120px]"
                onAction={(a) => logic.onAction(a, record)}
                actions={[
                  {
                    label: "编辑",
                    type: "EDIT",
                    auth: AdvertisingPlanManagementAuth.campaignUpdate,
                  },
                ]}
              />
            );
          }}
        </Observer>
      ),
    },
  ];

  return (
    <TXTable<IAdvertisingPlanManagement>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="ADVERTISING_PLAN_MANAGEMENT_LIST_TABLE"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    ></TXTable>
  );
});
