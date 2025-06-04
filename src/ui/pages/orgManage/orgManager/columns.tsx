import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { renderEnable } from "@/pages/basic/employee/columns";
import { OrganizationAuth } from "@/pages/orgManage/orgManager/auth";
import { Button, Space, Tag } from "antd";
import { useMemo } from "react";

export const useColumns = (params: { logic: any }) => {
  const { openEditModalUpdate, setUpdateModalData, getOrgDetail } =
    params.logic;

  return useMemo(
    () => [
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
          return renderEnable(text);
        },
      },
      {
        title: "联系人姓名",
        dataIndex: "contactName",
        key: "contactName",
        render: (text: string) => text || "-",
        width: 90,
      },
      {
        title: "联系人电话",
        dataIndex: "contactPhone",
        key: "contactPhone",
        width: 120,
        render: (text: string) => <TXCopyableTableCell copyText={text} />,
      },
      {
        title: "机构邮箱",
        dataIndex: "email",
        key: "email",
        width: 100,
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
        width: 100,
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
        width: 100,
        filters: [
          { text: "合作中", value: "IN_PROGRESS" },
          { text: "已暂停", value: "PAUSED" },
        ],
        onFilter: (value: string, record: any) =>
          record.cooperationStatus === value,
      },
      {
        title: "操作",
        key: "action",
        width: 60,
        render: (_: any, record: any) => (
          <Space size="middle">
            {OrganizationAuth.organizationUpdate && (
              <Button
                type="link"
                onClick={() => {
                  setUpdateModalData(record);
                  getOrgDetail(record.id);
                  openEditModalUpdate();
                }}
              >
                编辑
              </Button>
            )}
          </Space>
        ),
      },
    ],
    [openEditModalUpdate, setUpdateModalData, getOrgDetail]
  );
};
