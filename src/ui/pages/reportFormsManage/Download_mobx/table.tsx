import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { downloadFile } from "@/utils/tools";
import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Table as AntdTable, Button, Tag } from "antd";
import { useStore } from "./store/RootStore";

const Table = observer(() => {
  const { scrollY } = usePageTableScrollY();
  const root = useStore();
  const { logic, computed } = root;

  const columns = [
    {
      title: "文件名",
      dataIndex: ["fileInfo", "fileName"],
      key: "fileName",
      render: (fileName: string) => {
        return fileName || "-";
      },
    },
    {
      title: "文件状态",
      dataIndex: "processStatus",
      key: "processStatus",
      render: (status: string) => {
        const statusMap: { [key: string]: { text: string; color: string } } = {
          PROCESSING: { text: "导出中", color: "blue" },
          COMPLETED: { text: "已完成", color: "green" },
          FAILED: { text: "失败", color: "red" },
          EXPIRED: { text: "已过期", color: "gray" },
        };
        return (
          <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>
        );
      },
    },
    {
      title: "导出目的",
      dataIndex: "purpose",
      key: "purpose",
      render: (purpose: string) => {
        const purposeMap: { [key: string]: string } = {
          CUSTOMER_DEAL: "客户成交",
          LITTLE_RED_BOOK_COST: "小红书投放成本",
          LITTLE_RED_BOOK_COST_LEADS: "小红书投放成本—线索质量",
          LITTLE_RED_BOOK_RETENTION_INFORMATION: "小红书私信留资信息",
          A0001: "机构地区商务日表",
          A0002: "客户地区商务日表",
          A0003: "商务周表",
          A0004: "商务月表",
          B0001: "小红书分流表",
          B0002: "小红书投放监测表",
          B0003: "OA渠道客资监测表",
          C0001: "个人业绩明细表",
          C0002: "团队业绩明细表",
          C0003: "团队业绩总览表",
          C0004: "团队业绩组内明细表",
          C0005: "个人成交详情表",
          C0006: "商城/OA注册成交总览",
          C0007: "客户意向项目总览",
          C0008: "客户归属地区总览",
          C0009: "客单价总览",
          C0010: "渠道新客成交表",
          C0011: "老带新总览",
        };
        return purposeMap[purpose] || purpose;
      },
    },
    {
      title: "导出时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => {
        return (
          <Button
            type="link"
            onClick={() =>
              downloadFile(record.fileInfo.fullPath, record.fileInfo.fileName)
            }
            disabled={record.processStatus !== "COMPLETED"}
          >
            下载
          </Button>
        );
      },
    },
  ];

  useWhen(
    () => true,
    () => logic.getDownloadList()
  );
  return (
    <>
      <AntdTable
        dataSource={logic.dataSource}
        loading={computed.downloadListLoading}
        scroll={{
          x: "max-content",
          y: scrollY,
        }}
        rowKey="id"
        pagination={{
          className: "mt-4",
          pageSize: logic.pageSize,
          current: logic.current,
          total: logic.total,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          showTotal: (total) => `共 ${total} 条`,
          onChange: logic.onChangePageSize,
        }}
        columns={columns}
      />
    </>
  );
});

export default Table;
