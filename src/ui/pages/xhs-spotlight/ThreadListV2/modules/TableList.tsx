import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, TableColumnsType, Tag, Tooltip } from "antd";
import { IPagination } from "@/utils/interface";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import TXTable from "@/components/TXTable";
import { syncStatusMap } from "../constant";
import { IResBusinessV1LittleRedBookLeadsPushGetPage } from "@/service/business/v1/little-red-book-leads-push/get-page";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const columns: TableColumnsType<IResBusinessV1LittleRedBookLeadsPushGetPage> =
    [
      {
        title: "私信接收人",
        dataIndex: "msgReceiveName",
        key: "msgReceiveName",
        fixed: "left",
        width: 120,
      },
      {
        title: "小红书号",
        dataIndex: "redId",
        key: "redId",
        fixed: "left",
        width: 120,
        render: (text) => (
          <TXListRow className="w-[120px]" list={text ? [text] : []} />
        ),
      },
      {
        title: "电话号码",
        dataIndex: "phoneNum",
        key: "phoneNum",
        fixed: "left",
        width: 120,
        render: (text) => (
          <TXListRow className="w-[120px]" list={text ? [text] : []} />
        ),
      },
      {
        title: "微信号",
        dataIndex: "wechat",
        key: "wechat",
        fixed: "left",
        width: 120,
        render: (text) => (
          <TXListRow className="w-[120px]" list={text ? [text] : []} />
        ),
      },
      {
        title: "实际推送时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
      },
      {
        title: "小红书首次留资时间",
        dataIndex: "time",
        key: "time",
        width: 160,
      },
      {
        title: "线索创建时间",
        dataIndex: "leadsCreateTime",
        key: "leadsCreateTime",
        width: 120,
      },
      {
        title: "用户昵称",
        dataIndex: "nickName",
        key: "nickName",
        width: 100,
      },
      {
        title: "广告计划名称",
        dataIndex: "campaignName",
        key: "campaignName",
        width: 120,
        render: (text) => {
          return (
            <Tooltip title={text} trigger={"hover"}>
              <p className={"w-[120px] truncate"}>{text || "-"}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "需求",
        dataIndex: "demand",
        key: "demand",
        width: 80,
        render: (text) => {
          return (
            <Tooltip title={text} trigger={"hover"}>
              <p className={"w-[60px] truncate"}>{text || "-"}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "素材",
        width: 80,
        dataIndex: "materialName",
        key: "materialName",
        render: (text) => {
          return (
            <Tooltip title={text} trigger={"hover"}>
              <p className={"w-[60px] truncate"}>{text || "-"}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "小红书所属人",
        dataIndex: "ownerUserName",
        key: "ownerUserName",
        width: 120,
      },
      {
        title: "客户所属人",
        dataIndex: "customerOwnerUserName",
        key: "customerOwnerUserName",
        width: 120,
      },
      {
        title: "同步状态",
        dataIndex: "syncStatus",
        key: "syncStatus",
        width: 100,
        render: (status) => {
          const config = syncStatusMap[status] || {
            text: "-",
            color: "default",
          };
          return <Tag color={config.color}>{config.text}</Tag>;
        },
      },
      {
        title: "微信通过状态",
        dataIndex: "weChatStatus",
        key: "weChatStatus",
        width: 120,
        render: (status) => {
          const statusMap: Record<string, { text: string; color: string }> = {
            UN_PASSED: { text: "未通过", color: "error" },
            PASSED: { text: "已通过", color: "success" },
            UN_DEFINED: { text: "未定义", color: "default" },
          };
          return status ? (
            <Tag color={statusMap[status]?.color || "default"}>
              {statusMap[status]?.text || status}
            </Tag>
          ) : (
            "-"
          );
        },
      },
      {
        title: "用户地址",
        dataIndex: "area",
        key: "area",
        width: 160,
        render: (area, record) => {
          if (area && record.city) {
            return `${area}/${record.city}`;
          }
          return area || record.city || "-";
        },
      },
      {
        title: "笔记链接",
        dataIndex: "noteLink",
        key: "noteLink",
        width: 100,
        render: (link) =>
          link ? (
            <Button type="link" onClick={() => window.open(link, "_blank")}>
              访问
            </Button>
          ) : (
            "没有链接"
          ),
      },
      {
        title: "来源类型",
        dataIndex: "littleRedBookLeadsSource",
        key: "littleRedBookLeadsSource",
        fixed: "right",
        width: 100,
        render: (source) => {
          const sourceMap: Record<string, { text: string; color: string }> = {
            NATURAL_FLOW: { text: "自然流", color: "lime" },
            PUT_IN: { text: "投放", color: "magenta" },
          };
          return (
            <Tag color={sourceMap[source]?.color}>
              {sourceMap[source]?.text}
            </Tag>
          );
        },
      },
      {
        title: "线索标签",
        dataIndex: "leadsTag",
        key: "leadsTag",
        fixed: "right",
        width: 100,
      },
    ];

  return (
    <TXTable<IResBusinessV1LittleRedBookLeadsPushGetPage>
      columns={columns}
      dataSource={logic.dataSource}
      tableKey="XHSSPOTLIGHT_THREADLIST"
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
