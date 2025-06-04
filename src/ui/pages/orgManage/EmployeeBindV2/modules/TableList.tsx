import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, TableColumnsType, Tag, Popconfirm, Space } from "antd";
import { IPagination } from "@/utils/interface";
import { IResBaseV1UserOrganizationRelationGetPage } from "@/service/base/v1/user-organization-relation/get-page";
import TXTable from "@/components/TXTable";
import { EmployeeBindAuth } from "../auth";
export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBaseV1UserOrganizationRelationGetPage> = [
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      width: 240,
    },
    {
      title: "绑定机构",
      dataIndex: "orgNames",
      key: "orgNames",
      width: 240,
      render: (orgNames: string) => (
        <div className="flex flex-wrap gap-1">
          {orgNames?.split(",").map((name, index) => (
            <Tag key={index} color="default">
              {name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          {EmployeeBindAuth.userOrgRelationUpdate && (
            <Button
              type="link"
              size="small"
              onClick={() => {
                refs.editRef.current?.openModal({ userId: record.userId });
              }}
            >
              编辑
            </Button>
          )}
          {EmployeeBindAuth.userOrgRelationDelete && (
            <Popconfirm
              title="确定要删除这个员工绑定吗？"
              onConfirm={() => logic.deleteEmployee(record.userId)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                size="small"
                danger
                loading={computed.deleteLoading}
              >
                删除
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <TXTable<IResBaseV1UserOrganizationRelationGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="EMPLOYEE_INSTITUTION_BINDING"
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
