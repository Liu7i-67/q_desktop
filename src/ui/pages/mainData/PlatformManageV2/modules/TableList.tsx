import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TableColumnsType, Tooltip, Tag } from "antd";
import { IPagination } from "@/utils/interface";
import dayjs from "dayjs";
import TXTable from "@/components/TXTable";
import { TXTableAction } from "@/components/TXTableAction";
import { PlatformAuth } from "../auth";
import { IResBaseV1PlatformGetPage } from "@/service/base/v1/platform/get-page";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBaseV1PlatformGetPage> = [
    {
      title: "平台名称",
      dataIndex: "platformName",
      key: "platformName",
      width: 200,
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      key: "enableFlag",
      width: 120,
      render: (text: boolean) => {
        switch (text) {
          case true:
            return <Tag color={"green"}>是</Tag>;
          case false:
            return <Tag color="red">否</Tag>;
        }
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
      title: "最后更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 180,
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
    },
    {
      title: "备注",
      dataIndex: "memo",
      key: "memo",
      width: 300,
      ellipsis: true,
      render: (text: string) => {
        return (
          <Tooltip placement={"top"} title={text ?? ""}>
            <div className={"max-w-[300px] truncate"}>{text || "-"}</div>
          </Tooltip>
        );
      },
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_, record) => (
        <TXTableAction
          onAction={(action) => {
            if (action === "EDIT") {
              refs.editRef.current?.openModal(record);
            }
          }}
          actions={[
            {
              type: "EDIT",
              label: "编辑",
              auth: PlatformAuth.platformUpdate,
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
    <TXTable<IResBaseV1PlatformGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="PLATFORM_MANAGE"
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
