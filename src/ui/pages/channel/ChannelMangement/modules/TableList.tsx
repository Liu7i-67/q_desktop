import { renderEnableFlag } from "@/utils/commonRender";
import { IPagination } from "@/utils/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Space, TableColumnsType, Tooltip } from "antd";
import dayjs from "dayjs";
import { ChannelAuth } from "../auth";
import { IChannelMangement } from "../interface";
import { useStore } from "../store/RootStore";
import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: ITXColumnType<IChannelMangement>[] = [
    {
      title: "渠道名称",
      dataIndex: "channelName",
      key: "channelName",
      width: 250,
    },
    {
      title: "渠道分类全路径",
      dataIndex: "channelTypeFullName",
      key: "channelTypeFullName",
      width: 300,
      render: (text: string) => {
        return (
          <Tooltip placement={"top"} title={text ?? ""}>
            <p className={"max-w-[300px] truncate"}>{text ?? ""}</p>
          </Tooltip>
        );
      },
    },
    {
      title: "负责人",
      dataIndex: "mangementUsers",
      key: "mangementUsers",
      width: 150,
      dataType: "list",
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      key: "enableFlag",
      width: 150,
      render: (text: boolean) => {
        return renderEnableFlag(text);
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 180,
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
    },
    {
      title: "最后修改时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 180,
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
    },
    {
      title: "操作",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size={2}>
          {ChannelAuth.channelUpdate && (
            <Button
              type="link"
              onClick={() => {
                refs.editModalRef.current?.openModal({
                  tree: refs.txTreeSidebarRef.current?.exportTreeData() ?? [],
                  recordId: record.id,
                });
              }}
            >
              编辑
            </Button>
          )}
          <Button type="link" onClick={() => {}} disabled>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <TXTable<IChannelMangement>
      className="ml-4"
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="CHANNEL_MANGEMENT"
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
        y: "calc(100vh - 260px)",
      }}
    />
  );
});
