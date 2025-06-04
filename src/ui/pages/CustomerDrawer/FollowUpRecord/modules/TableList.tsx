import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Table, TableColumnsType, Tag, Tooltip } from "antd";
import { IFollowUpRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import { TXTime } from "@/components/TXTableRender/TXTime";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: TableColumnsType<IFollowUpRecord> = [
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 250,
      render: (time) => <TXTime time={time} />,
    },
    {
      title: "跟进内容",
      dataIndex: "memo",
      key: "memo",
      width: 500,
      render: (text: string) => {
        return (
          <Tooltip placement={"top"} title={text ?? ""}>
            <p className={"max-w-[500px] wes"}>{text || "-"}</p>
          </Tooltip>
        );
      },
    },
    {
      title: "下次跟进日期",
      dataIndex: "nextDate",
      key: "nextDate",
      width: 250,
      render: (time) => <TXTime time={time} />,
    },
  ];

  return (
    <TXTable<IFollowUpRecord>
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="MY_CUSTOMER_FOLLOW_UP_RECORD"
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
        y: "calc(100vh - 300px)",
      }}
    />
  );
});
