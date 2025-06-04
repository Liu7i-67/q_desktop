import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TableColumnsType, Tooltip } from "antd";
import { IPagination } from "@/utils/interface";
import TXTable from "@/components/TXTable";
import dayjs from "dayjs";
import { TXTableAction } from "@/components/TXTableAction";
import { RoleAuth } from "../auth";
import { IResBaseV1SysRoleGetPage } from "@/service/base/v1/sys-role/get-page";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBaseV1SysRoleGetPage> = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      width: 200,
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
      title: "备注",
      dataIndex: "memo",
      key: "memo",
      width: 200,
      ellipsis: true,
      render: (text: string) => {
        return (
          <Tooltip placement={"top"} title={text ?? ""}>
            <p className={"max-w-[200px] truncate"}>{text || "-"}</p>
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
              refs.editRef.current?.openModal({ id: record.id });
            }
          }}
          actions={[
            {
              type: "EDIT",
              label: "编辑",
              auth: RoleAuth.roleUpdate,
            },
            {
              type: "DELETE",
              label: "删除",
              auth: true,
              disabled: true,
              disabledTips: "暂时无法删除",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <TXTable<IResBaseV1SysRoleGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      tableKey="BASIC_ROLE"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
