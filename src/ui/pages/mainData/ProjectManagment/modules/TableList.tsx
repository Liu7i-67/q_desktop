import { renderEnableFlag } from "@/utils/commonRender";
import { IPagination } from "@/utils/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Space, Table, TableColumnsType, Tooltip } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { ProjectManagementAuth } from "../auth";
import { IProjectManagment } from "../interface";
import { useStore } from "../store/RootStore";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  const columns: TableColumnsType<IProjectManagment> = [
    {
      title: "项目名称",
      dataIndex: "projectName",
      key: "projectName",
      width: 150,
    },
    {
      title: "项目编码",
      dataIndex: "projectCode",
      key: "projectCode",
      width: 150,
    },
    {
      title: "项目分类全路径",
      dataIndex: "typeFullName",
      key: "typeFullName",
      width: 200,
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
      title: "备注",
      dataIndex: "memo",
      key: "memo",
      width: 200,
      render: (text: string) => {
        return (
          <Tooltip placement={"top"} title={text ?? ""}>
            <p className={"w-[200px] truncate"}>{text || "-"}</p>
          </Tooltip>
        );
      },
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
      title: "最后修改时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 180,
      render: (text: string) =>
        text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      render: (_: any, record: any) => (
        <Space size={4}>
          {ProjectManagementAuth.projectUpdate && (
            <Button
              type="link"
              size="small"
              onClick={() => {
                refs.editModalRef.current?.openModal({
                  tree: refs.txTreeSidebarRef.current?.exportTreeData() ?? [],
                  recordId: record.id,
                  typeId: logic.typeId,
                });
              }}
            >
              编辑
            </Button>
          )}
          <Button type="link" size="small" danger disabled>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <TXTable<IProjectManagment>
      className="ml-4"
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="MAIN_DATA_PROJECT_MANAGE"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="id"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 280px)",
      }}
    />
  );
});
