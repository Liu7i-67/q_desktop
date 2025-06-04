import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TableColumnsType, Tag } from "antd";
import { IPagination } from "@/utils/interface";
import TXTable from "@/components/TXTable";
import { UserChannelRelationAuth } from "@/pages/channel/EmployeeBindV2/auth";
import { IResBaseV1UserChannelRelationGetPage } from "@/service/base/v1/user-channel-relation/getPage";
import { TXTableAction } from "@/components/TXTableAction";
import { TXTagStrs } from "@/components/TXTableRender/TXTagStrs";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBaseV1UserChannelRelationGetPage> = [
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      width: "20%",
    },
    {
      title: "绑定渠道",
      dataIndex: "channelNames",
      key: "channelNames",
      width: "70%",
      render: (channelNames: string) => (
        <TXTagStrs className="w-[70%]" str={channelNames} />
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_: string, record: IResBaseV1UserChannelRelationGetPage) => (
        <TXTableAction
          className="w-[120px]"
          onAction={(action) => logic.recordAction(record, action)}
          actions={[
            {
              type: "EDIT",
              label: "编辑",
              auth: UserChannelRelationAuth.userChannelRelationUpdate,
            },
            {
              type: "DELETE",
              label: "删除",
              auth: UserChannelRelationAuth.userChannelRelationDelete,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <TXTable<IResBaseV1UserChannelRelationGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="ADPUTMANAGE_XHSADPUT"
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="userId"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
