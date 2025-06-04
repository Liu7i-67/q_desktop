import TXTable from "@/components/TXTable";
import { ITXColumnType } from "@/components/TXTable/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { IPagination } from "@/utils/interface";
import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { TaskStrategyAuth } from "../../../auth";
import { IManageStartgy } from "../interface";
import { useStore } from "../store/RootStore";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, propsStore } = root;

  const columns: ITXColumnType<IManageStartgy>[] = [
    {
      title: "策略名称",
      dataIndex: "strategyName",
      key: "strategyName",
      width: 165,
    },
    {
      title: "策略描述",
      width: 520,
      dataIndex: "strategyDesc",
      key: "strategyDesc",
      dataType: "text",
      dataExtraProps: {
        text: {
          row: 3,
        },
      },
    },
    {
      title: "创建人",
      dataIndex: "createUserName",
      key: "createUserName",
      width: 107,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: 192,
      key: "createTime",
    },
    {
      title: "管理员",
      dataIndex: "caretaker",
      key: "caretaker",
      width: 218,
      render: (_, record) => (
        <TXListRow
          className="w-[218px]"
          list={record.caretaker.userList
            .filter((item) => item !== null)
            .map((item) => item.userName)}
          separator={"、"}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <TXTableAction
                className="w-[80px]"
                onAction={(a) => logic.onAction(a, record)}
                actions={[
                  {
                    label: "编辑",
                    icon: "icon-bianji",
                    type: "EDIT",
                    auth: TaskStrategyAuth.taskStrategyUpdate,
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
    <TXTable<IManageStartgy>
      tableKey="MY_MANAGE_STARTEGY"
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      size="small"
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
