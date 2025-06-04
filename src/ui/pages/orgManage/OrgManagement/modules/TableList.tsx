import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { renderEnableFlag } from "@/utils/commonRender";
import { IPagination } from "@/utils/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Space, TableColumnsType, Tag } from "antd";
import { useEffect } from "react";
import { OrganizationAuth } from "../auth";
import { IOrgManagement } from "../interface";
import { useStore } from "../store/RootStore";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  const columns: TableColumnsType<IOrgManagement> = [
    {
      title: "机构名称",
      dataIndex: "orgName",
      key: "orgName",
      width: 100,
    },
    {
      title: "机构分类全路径",
      dataIndex: "orgTypeFullName",
      key: "orgTypeFullName",
      width: 150,
    },
    {
      title: "机构所在地",
      dataIndex: "areaName",
      key: "areaName",
      width: 120,
    },
    {
      title: "是否启用",
      dataIndex: "enableFlag",
      key: "enableFlag",
      width: 120,
      render: (text: boolean) => {
        return renderEnableFlag(text);
      },
    },
    {
      title: "联系人姓名",
      dataIndex: "contactName",
      key: "contactName",
      render: (text: string) => text || "-",
      width: 120,
    },
    {
      title: "联系人电话",
      dataIndex: "contactPhone",
      key: "contactPhone",
      render: (text: string) => <TXCopyableTableCell copyText={text} />,
    },
    {
      title: "机构邮箱",
      dataIndex: "email",
      key: "email",
      width: 120,
      render: (text: string) => text || "-",
      onCell: () => ({
        style: {
          whiteSpace: "normal",
          minWidth: "100px",
          wordBreak: "break-all" as const,
        },
      }),
    },
    {
      title: "到期提醒",
      dataIndex: "remainderDays",
      key: "remainderDays",
      render: (text: string) => text + "天" || "-",
      width: 120,
    },
    {
      title: "机构合作状态",
      dataIndex: "cooperationStatus",
      key: "cooperationStatus",
      render: (status: string) => (
        <Tag color={status === "IN_PROGRESS" ? "green" : "red"}>
          {status === "IN_PROGRESS" ? "合作中" : "已暂停"}
        </Tag>
      ),
      width: 150,
      filters: [
        { text: "合作中", value: "IN_PROGRESS" },
        { text: "已暂停", value: "PAUSED" },
      ],
      onFilter: (value: any, record) => record.cooperationStatus === value,
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_: any, record) => (
        <Space size="middle">
          {OrganizationAuth.organizationUpdate && (
            <Button
              type="link"
              onClick={() => {
                refs.editModalRef.current?.openModal({
                  record,
                  cityTree: logic.cityTree,
                });
              }}
            >
              编辑
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <TXTable<IOrgManagement>
      className="ml-4"
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="INSTITUTIONAL_MANAGEMENT"
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
