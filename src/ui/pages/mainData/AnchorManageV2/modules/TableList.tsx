import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TableColumnsType, Tag, Tooltip } from "antd";
import { IPagination } from "@/utils/interface";
import dayjs from "dayjs";
import { LiveStreamerAuth } from "../auth";
import { cn } from "@/utils/tools";
import TXTable from "@/components/TXTable";
import { IResBaseV1LiveStreamerGetPage } from "@/service/base/v1/live-streamer/get-page";
import { TXTableAction } from "@/components/TXTableAction";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBaseV1LiveStreamerGetPage> = [
    {
      title: "主播名称",
      dataIndex: "streamerName",
      key: "streamerName",
      width: 200,
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      key: "enableFlag",
      render: (text: boolean) => {
        switch (text) {
          case true:
            return <Tag color={"green"}>是</Tag>;
          case false:
            return <Tag color="red">否</Tag>;
        }
      },
      width: 100,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      width: 200,
    },
    {
      title: "最后更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      width: 200,
    },
    {
      title: "备注",
      dataIndex: "memo",
      key: "memo",
      width: 300,
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (_, record) => (
        <TXTableAction
          className="w-[160px]"
          onAction={(action) => logic.recordAction(record, action)}
          actions={[
            {
              type: "EDIT",
              label: "编辑",
              auth: LiveStreamerAuth.liveStreamerUpdate,
            },
            {
              type: "DELETE",
              label: "删除",
              auth: true,
              disabled: true,
              disabledTips: "暂不支持删除",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <TXTable<IResBaseV1LiveStreamerGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="ANCHOR_MANAGE"
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
