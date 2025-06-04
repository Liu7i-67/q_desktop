import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { IVisitRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import { Modal } from "@/components/TXModal";
import { TXTagStrs } from "@/components/TXTableRender/TXTagStrs";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed } = root;

  const columns: TableColumnsType<IVisitRecord> = [
    {
      title: "到院时间",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      width: 160,
    },
    {
      title: "上门项名称",
      dataIndex: "dataNames",
      key: "dataNames",
      width: 500,
      render: (text: string) => <TXTagStrs str={text} />,
    },
    {
      title: "机构名称",
      dataIndex: "orgName",
      key: "orgName",
      width: 160,
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      width: 80,
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <div>
                <Button
                  danger
                  type="link"
                  size="small"
                  onClick={() => {
                    Modal.confirm({
                      title: "确认删除",
                      content: "确定删除该条到院记录吗？",
                      okText: "确认",
                      cancelText: "取消",
                      onOk: () => {
                        logic.deleteRecord(record);
                      },
                    });
                  }}
                >
                  删除
                </Button>
              </div>
            );
          }}
        </Observer>
      ),
    },
  ];

  return (
    <TXTable<IVisitRecord>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="MY_CUSTOMER_VISIT_RECORD"
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
