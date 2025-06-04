import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { ILiveDataV2 } from "../interface";
import { IPagination } from "@/utils/interface";
import { TXTableAction } from "@/components/TXTableAction";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";
import userHelper from "@/utils/user-helper";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const isAdmin =
    ["1668201373050736640", "347893307260534818"].includes(
      userHelper.getInstance().getUserId
    ) ||
    userHelper.getInstance().getUserRoleIdList?.includes("1658036792173137921");

  const columns: ITXColumnType<ILiveDataV2>[] = [
    {
      title: "主播",
      dataIndex: "anchorName",
      key: "anchorName",
      width: 300,
    },
    {
      title: "总客户数",
      dataIndex: "totalNumberOfCustomers",
      key: "totalNumberOfCustomers",
      width: 100,
      onCell: (record) => {
        return {
          className: "cursor-pointer text-[#1677FF]",
          onClick: () => {
            refs.secondDetailRef.current?.openDrawer({
              liveStreamerIdList: [record.liveStreamerId],
              createTimeStart:
                logic.formInfo.date?.[0]?.format("YYYY-MM-DD 00:00:00") || "",
              createTimeEnd:
                logic.formInfo.date?.[1]?.format("YYYY-MM-DD 23:59:59") || "",
            });
          },
        };
      },
    },
    {
      title: "有效客资数",
      dataIndex: "numberOfValidCustomers",
      key: "numberOfValidCustomers",
      width: 100,
      onCell: (record) => {
        return {
          className: "cursor-pointer text-[#1677FF]",
          onClick: () => {
            refs.secondDetailRef.current?.openDrawer({
              liveStreamerIdList: [record.liveStreamerId],
              createTimeStart:
                logic.formInfo.date?.[0]?.format("YYYY-MM-DD 00:00:00") || "",
              createTimeEnd:
                logic.formInfo.date?.[1]?.format("YYYY-MM-DD 23:59:59") || "",
            });
          },
        };
      },
    },
    {
      title: "成交人数",
      dataIndex: "numberOfPeopleDealt",
      key: "numberOfPeopleDealt",
      width: 100,
      auth: isAdmin,
      onCell: (record) => {
        return {
          className: "cursor-pointer text-[#1677FF]",
          onClick: () => {
            refs.dealRef.current?.openDrawer({
              liveStreamerIdList: [record.liveStreamerId],
              createTimeStart:
                logic.formInfo.date?.[0]?.format("YYYY-MM-DD 00:00:00") || "",
              createTimeEnd:
                logic.formInfo.date?.[1]?.format("YYYY-MM-DD 23:59:59") || "",
            });
          },
        };
      },
    },
    {
      title: "成交金额",
      dataIndex: "totalAmountOfDeal",
      key: "totalAmountOfDeal",
      width: 100,
      auth: isAdmin,
      render: (text) => (text ? `￥${text}` : "-"),
      onCell: (record) => {
        return {
          className: "cursor-pointer text-[#1677FF]",
          onClick: () => {
            refs.dealRef.current?.openDrawer({
              liveStreamerIdList: [record.liveStreamerId],
              createTimeStart:
                logic.formInfo.date?.[0]?.format("YYYY-MM-DD 00:00:00") || "",
              createTimeEnd:
                logic.formInfo.date?.[1]?.format("YYYY-MM-DD 23:59:59") || "",
            });
          },
        };
      },
    },
    {
      title: "操作",
      dataIndex: "x",
      key: "x",
      width: 120,
      render: (_, record) => (
        <Observer>
          {() => {
            return (
              <TXTableAction
                className="w-[120px]"
                onAction={(a) => logic.onAction(a, record)}
                actions={[
                  {
                    label: "查看详情",
                    type: "DETAIL",
                    auth: true,
                  },
                ]}
              />
            );
          }}
        </Observer>
      ),
    },
  ];

  return (
    <TXTable<ILiveDataV2>
      columns={columns}
      dataSource={logic.dataSource}
      pagination={{
        pageSize: logic.pagination.pageSize,
        current: logic.pagination.current,
        total: logic.pagination.total,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
      tableKey="REPORTFORMS_MANAGE_LIVE_DATA"
      onChange={(p) => logic.onPageChange(p as IPagination)}
      rowKey="liveStreamerId"
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 340px)",
      }}
    />
  );
});
