import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Badge, Tooltip, Button } from "antd";
import { ITotal } from "../interface";
import { IPagination } from "@/utils/interface";
import TXTable from "@/components/TXTable";
import { TXButton } from "@/components/TXButton";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import NoData from "../../modules/NoData";
import { cn } from "@/utils/tools";
import { useNavigate } from "react-router";
import { ITXColumnType } from "@/components/TXTable/interface";
import { ReloadOutlined } from "@ant-design/icons";

const TipsDom = (
  <Tooltip title="该客户存在跨门店【派单】或【成交】记录，请在老系统或联系技术人员查看历史数据。">
    <div
      className={cn(
        "text-white font-bold mr-1",
        "flex justify-center items-center",
        "w-[16px] h-[16px] rounded-[50%] cursor-pointer",
        "bg-gradient-to-b from-yellow-500 to-yellow-400"
      )}
    >
      ?
    </div>
  </Tooltip>
);

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;
  const navigate = useNavigate();

  const columns: ITXColumnType<ITotal>[] = [
    {
      width: 12,
      key: "index",
      className: "no-before !px-0",
      render: (text, record) => {
        if (record.priorityFlag === true) {
          return <div className="h-[32px] w-[2px] bg-[#FF8723]" />;
        }
        if (record.lastForgetFlag === true) {
          return <div className="h-[32px] w-[2px] bg-[#2251F8]" />;
        }
        return;
      },
    },
    {
      title: "客户归属人",
      width: 120,
      dataIndex: "ownerName",
      key: "ownerName",
      render: (_, record) => {
        const { ownerName } = record?.customerDTO || {};
        const list = [];
        if (record.hasCrossStoreRecord) {
          list.push(TipsDom);
        }
        list.push(ownerName || "-");
        return <TXListRow className="w-[120px]" list={list} />;
      },
    },
    {
      title: "协作人",
      width: 80,
      dataIndex: "xzrList",
      key: "xzrList",
      dataType: "list",
    },
    {
      title: "客户电话",
      width: 120,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      dataType: "list",
    },
    {
      title: "客户微信",
      width: 100,
      dataIndex: "wechatNumber",
      key: "wechatNumber",
      dataType: "list",
    },
    {
      title: "建档时间",
      width: 140,
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "微信通过状态",
      width: 120,
      dataIndex: "wechatStatus",
      key: "wechatStatus",
      dataType: "badge",
      dataExtraProps: {
        badge: {
          options: {
            UN_PASSED: { color: "red", text: "未通过" },
            PASSED: { color: "green", text: "已通过" },
            UN_DEFINED: { color: "blue", text: "待定中" },
          },
        },
      },
    },
    {
      title: "客户状态",
      width: 100,
      dataIndex: "customerStatus",
      key: "customerStatus",
      dataType: "tag",
      dataExtraProps: {
        tag: {
          options: {
            EMPTY: { color: "default", text: "空" },
            IN_PROGRESS: { color: "orange", text: "开发中" },
            DEAL: { color: "success", text: "成交" },
            REPEAT_PURCHASE: { color: "processing", text: "复购" },
          },
        },
      },
    },
    {
      title: "任务截止时间",
      width: 120,
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      width: 120,
      render: (_, record) => (
        <TXButton
          type="link"
          onClick={() =>
            refs.customerDrawerRef.current?.openDrawer({
              customerId: record.customerId,
              defaultTab: "FOLLOW_UP_RECORD",
            })
          }
        >
          跟进客户
        </TXButton>
      ),
    },
  ];

  return (
    <TXTable<ITotal>
      title={() => (
        <>
          <Badge color="#FF8723" text="高优先级任务" />
          <Badge className="ml-4" color="#2251F8" text="漏跟客户" />
          <Button
            className="ml-4"
            icon={<ReloadOutlined />}
            onClick={() => {
              logic.getList();
              logic.getStatistics();
            }}
          >
            刷新
          </Button>
        </>
      )}
      rowClassName={(record: ITotal) => {
        if (record.priorityFlag === true) {
          return "!bg-[#FEF6F0]";
        }
        if (record.lastForgetFlag === true) {
          return "!bg-[#F0F6FE]";
        }
        return "";
      }}
      tableKey="TODAY_TOTAL_UNFINISHED"
      size="small"
      columns={columns}
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
        y: logic.showStatistics ? "calc(100vh - 400px)" : "calc(100vh - 300px)",
      }}
      locale={{
        emptyText: (
          <NoData
            onLinkClick={() =>
              navigate("/workplan/taskOverview?type=taskCalendar")
            }
          />
        ),
      }}
    />
  );
});
