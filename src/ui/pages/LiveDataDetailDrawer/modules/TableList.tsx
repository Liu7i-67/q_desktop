import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { ILiveDataDetailRecord } from "../interface";
import { IPagination } from "@/utils/interface";
import userHelper from "@/utils/user-helper";
import { ITXColumnType } from "@/components/TXTable/interface";
import TXTable from "@/components/TXTable";

export const TableList = observer(function TableList_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const isAdmin = ["1668201373050736640", "347893307260534818"].includes(
    userHelper.getInstance().getUserId
  );

  const columns: ITXColumnType<ILiveDataDetailRecord>[] = [
    {
      title: "平台",
      dataIndex: "platformName",
      key: "platformName",
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
          onClick: () =>
            refs.secondDrawerRef.current?.openDrawer({
              platformIdList: [record?.platformId],
              liveStreamerIdList: [logic.initData?.id || ""],
              createTimeStart: logic.initData?.startLocalDateTime,
              createTimeEnd: logic.initData?.endLocalDateTime,
            }),
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
          onClick: () =>
            refs.secondDrawerRef.current?.openDrawer({
              platformIdList: [record?.platformId],
              liveStreamerIdList: [logic.initData?.id || ""],
              createTimeStart: logic.initData?.startLocalDateTime,
              createTimeEnd: logic.initData?.endLocalDateTime,
            }),
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
          onClick: () =>
            refs.dealDrawerRef.current?.openDrawer({
              platformIdList: [record?.platformId],
              liveStreamerIdList: [logic.initData?.id || ""],
              createTimeStart: logic.initData?.startLocalDateTime,
              createTimeEnd: logic.initData?.endLocalDateTime,
            }),
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
          onClick: () =>
            refs.dealDrawerRef.current?.openDrawer({
              platformIdList: [record?.platformId],
              liveStreamerIdList: [logic.initData?.id || ""],
              createTimeStart: logic.initData?.startLocalDateTime,
              createTimeEnd: logic.initData?.endLocalDateTime,
            }),
        };
      },
    },
  ];

  return (
    <TXTable<ILiveDataDetailRecord>
      dataSource={logic.dataSource}
      loading={computed.loading}
      scroll={{
        x: "max-content",
        y: "calc(100vh - 220px)",
      }}
      tableKey="REPORT_MANAGE_LIVE_DATA_DETAILS"
      rowKey="platformId"
      columns={columns}
      onChange={(p) => logic.onPageChange(p as IPagination)}
      pagination={{
        ...logic.pagination,
        showSizeChanger: true,
        showTotal: (t) => `共${t}条`,
      }}
    />
  );
});
