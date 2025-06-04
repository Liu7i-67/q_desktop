import TXTable from "@/components/TXTable";
import { TXTableAction } from "@/components/TXTableAction";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { renderEnableFlag, renderUserType } from "@/utils/commonRender";
import { IPagination } from "@/utils/interface";
import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { TableColumnsType } from "antd";
import { EmployeeAuth } from "../auth";
import { IEmployeeV2 } from "../interface";
import { useStore } from "../store/RootStore";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IEmployeeV2> = [
    {
      title: "用户类型",
      dataIndex: "userType",
      key: "userType",
      width: 80,
      render: (text: any) => {
        return renderUserType(text);
      },
    },
    {
      title: "账号",
      dataIndex: "userAccount",
      key: "userAccount",
      width: 100,
      render: (text) => (
        <TXListRow className="w-[100px]" list={text ? [text] : []} />
      ),
    },
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
      width: 150,
      render: (text) => (
        <TXListRow className="w-[150px]" list={text ? [text] : []} />
      ),
    },
    {
      title: "电话",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
      render: (text) => (
        <TXListRow className="w-[150px]" list={text ? [text] : []} />
      ),
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      width: 150,
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "角色",
      dataIndex: "relationRoleNames",
      key: "relationRoleNames",
      width: 120,
    },
    {
      title: "所属部门",
      dataIndex: "relationDeptNames",
      key: "relationDeptNames",
      width: 150,
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      key: "enableFlag",
      width: 90,
      render: (text: boolean) => {
        return renderEnableFlag(text);
      },
    },
    {
      title: "上次登录时间",
      dataIndex: "lastLoginTime",
      key: "lastLoginTime",
      width: 180,
      render: (text: string) => text ?? "-",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 180,
      render: (text: string) => text ?? "-",
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      fixed: "right",
      render: (text, record) => {
        return (
          <Observer>
            {() => {
              return (
                <TXTableAction
                  className="w-[200px]"
                  maxCount={4}
                  actions={[
                    {
                      label: "重置密码",
                      auth: true,
                      popconfirm: {
                        title: "确认重置该员工密码吗？",
                        // description: <TableRestPasswordDes />,
                        onConfirm: () => {
                          logic.onRestPassword(record.id);
                        },
                      },
                    },
                    {
                      label: "编辑",
                      onClick: () => {
                        refs.editEmployeeModalRef.current?.openModal(record.id);
                      },
                      auth: EmployeeAuth.userUpdate,
                    },
                    {
                      label: "删除",
                      disabled: true,
                      auth: true,
                      disabledTips: "当前不允许删除员工操作",
                    },
                  ]}
                />
              );
            }}
          </Observer>
        );
      },
    },
  ];

  return (
    <TXTable<IEmployeeV2>
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="BASIC_EMPLOYEE"
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
