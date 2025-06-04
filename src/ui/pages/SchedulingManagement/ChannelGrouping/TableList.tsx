import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "./store/RootStore";
import { Button, Tag } from "antd";
import { IChannelGrouping } from "./interface";
import { IPagination } from "@/utils/interface";
import { SchedulingManagementAuth } from "../auth";
import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";
import { TXTableAction } from "@/components/TXTableAction";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: ITXColumnType<IChannelGrouping>[] = [
    {
      title: "渠道分组名称",
      width: 240,
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "创建时间",
      width: 240,
      dataIndex: "createTime",
      key: "createTime",
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
                    label: "修改",
                    type: "EDIT",
                    auth: SchedulingManagementAuth.redBookChannelGroupUpdate,
                  },
                  {
                    label: "删除",
                    type: "DELETE",
                    auth: SchedulingManagementAuth.redBookChannelGroupDelete,
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
    <TXTable<IChannelGrouping>
      columns={columns}
      expandable={{
        expandedRowKeys: logic.expandRows,
        onExpandedRowsChange: (expandRows: any) => {
          logic.setExpandRows(expandRows);
        },
        expandedRowRender: (record) => (
          <div className="flex flex-wrap gap-2">
            {record.channelDTOList.map((i) => {
              return (
                <Tag key={i.id} color="blue" bordered={false}>
                  {i.channelName}
                </Tag>
              );
            })}
          </div>
        ),
      }}
      dataSource={logic.dataSource}
      tableKey="CHANNEL_GROUPING"
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="groupId"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
