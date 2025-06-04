import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { IListOfDpts } from "../interface";
import { IPagination } from "@/utils/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";
import { classNames } from "@/utils/tools";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, propsStore } = root;

  const columns: ITXColumnType<IListOfDpts>[] = [
    {
      title: "部门",
      width: 160,
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "今日截止任务",
      width: 140,
      dataIndex: "deadlineTaskCount",
      key: "deadlineTaskCount",
    },
    {
      title: "截止任务已完成",
      width: 140,
      dataIndex: "deadlineCompletedTaskCount",
      key: "deadlineCompletedTaskCount",
    },
    {
      title: "截止任务未完成",
      width: 140,
      dataIndex: "deadlineWaitCompletedTaskCount",
      key: "deadlineWaitCompletedTaskCount",
    },
    {
      title: "截止任务完成率",
      width: 140,
      dataIndex: "deadlineTaskCompletionRate",
      key: "deadlineTaskCompletionRate",
      dataType: "percent",
    },
    {
      title: "今日总任务",
      width: 140,
      dataIndex: "taskCount",
      key: "taskCount",
    },
    {
      title: "总任务已完成",
      width: 140,
      dataIndex: "completedTaskCount",
      key: "completedTaskCount",
    },
    {
      title: "总任务未完成",
      width: 140,
      dataIndex: "waitCompletedTaskCount",
      key: "waitCompletedTaskCount",
    },
    {
      title: "总任务完成率",
      width: 140,
      dataIndex: "taskCompletionRate",
      key: "taskCompletionRate",
      dataType: "percent",
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      fixed: "right",
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
                    label: "查看跟进内容",
                    type: "DETAIL",
                    auth: true,
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
    <TXTable<IListOfDpts>
      columns={columns}
      dataSource={logic.dataSource}
      className={classNames({
        hidden: logic.active === "type2",
      })}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      size="small"
      tableKey="LIST_OF_CONSULTANTS_LIST_DPT_TABLE"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="deptId"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: propsStore.props.height,
      }}
    />
  );
});
