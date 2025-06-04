import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { IOrganizationRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import { Modal } from "@/components/TXModal";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs, propsStore } = root;

  const columns: TableColumnsType<IOrganizationRecord> = [
    {
      title: "联系时间",
      dataIndex: "contactTime",
      key: "contactTime",
      width: 160,
    },
    {
      title: "客户名称",
      dataIndex: "customerName",
      key: "customerName",
      width: 160,
    },
    {
      title: "机构名称",
      dataIndex: "organizationName",
      key: "organizationName",
      width: 300,
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <div>
                <Button
                  type="link"
                  onClick={() => {
                    refs.editRef.current?.openModal?.({
                      oldData: record,
                      customerId: propsStore.props.detail?.id as string,
                    });
                  }}
                >
                  修改
                </Button>
                <Button
                  danger
                  type="link"
                  size="small"
                  onClick={() => {
                    Modal.confirm({
                      title: "确认删除",
                      content: "确定删除该条机构联系记录吗？",
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
    <TXTable<IOrganizationRecord>
      columns={columns}
      tableKey="MY_CUSTOMER_ORGANIZATION_RECORD"
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
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 300px)",
      }}
    />
  );
});
