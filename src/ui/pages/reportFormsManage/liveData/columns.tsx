import { ILiveDataDetailDrawerRef } from "@/pages/LiveDataDetailDrawer/interface";
import userHelper from "@/utils/user-helper";
import { FormInstance } from "antd";

export const useColumns = (
  state: any,
  detailRef: React.RefObject<ILiveDataDetailDrawerRef>,
  form: FormInstance<any>
) => {
  const isAdmin = ["1668201373050736640", "347893307260534818"].includes(
    userHelper.getInstance().getUserId
  );

  return [
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
      render: (v: number | null) => {
        return v || 0;
      },
    },
    {
      title: "有效客资数",
      dataIndex: "numberOfValidCustomers",
      key: "numberOfValidCustomers",
      width: 100,
    },
    ...(isAdmin
      ? [
          {
            title: "成交人数",
            dataIndex: "numberOfPeopleDealt",
            key: "numberOfPeopleDealt",
            width: 100,
          },
          {
            title: "成交金额",
            dataIndex: "totalAmountOfDeal",
            key: "totalAmountOfDeal",
            width: 100,
          },
        ]
      : []),

    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (_: void, record: { liveStreamerId: string }) => {
        return (
          <a
            onClick={() => {
              const { date } = form.getFieldsValue();
              detailRef.current?.openDrawer({
                id: record.liveStreamerId,
                startLocalDateTime: date?.[0]
                  ?.startOf("day")
                  ?.format("YYYY-MM-DD HH:mm:ss"),
                endLocalDateTime: date?.[1]
                  ?.endOf("day")
                  ?.format("YYYY-MM-DD HH:mm:ss"),
              });
            }}
          >
            查看详情
          </a>
        );
      },
    },
  ];
};
