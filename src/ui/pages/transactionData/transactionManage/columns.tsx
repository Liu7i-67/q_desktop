import { EModalType } from "@/components/deal-confirm-modal/types";
import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { ITransactionRecordDetailModalRef } from "@/pages/CustomerDrawer/TransactionRecordDetailModal/interface";
import { CustomerStatus } from "@/pages/customerManage/myCustomer/service";
import { DealManagementAuth } from "@/pages/transactionData/transactionManage/auth";
import { formatCurrency } from "@/utils/tools";
import { Button, Popconfirm, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

export function useCol(params: {
  logic: any;
  runDeleteDeal: any;
  detailRef: React.RefObject<ITransactionRecordDetailModalRef>;
}) {
  const { loading } = params.runDeleteDeal;
  const {
    openHandleModalDeal,
    openHandleModalCancel,
    setHandleModalData,
    deleteDeal,
    handleOpenDetailModal,
  } = params.logic;

  return useMemo(
    () => [
      {
        title: "成交状态",
        dataIndex: "dealStatus",
        key: "dealStatus",
        width: 90,
        fixed: "left",
        render: (status: string) => {
          const statusMap: {
            [key: string]: { text: string; color: string };
          } = {
            UN_CONFIRMED: { text: "待确认", color: "warning" },
            CONFIRMED: { text: "已确认", color: "success" },
            CANCELED: { text: "已作废", color: "error" },
          };
          return (
            <Tag color={statusMap[status]?.color}>
              {statusMap[status]?.text || "-"}
            </Tag>
          );
        },
      },
      {
        title: "提交员工",
        dataIndex: "createUserName",
        key: "createUserName",
        width: 130,
        fixed: "left",
      },
      {
        title: "客户来源",
        dataIndex: "channelName",
        key: "channelName",
        width: 100,
        render: (text: string) => text || "-",
      },
      {
        title: "客户名称",
        dataIndex: "customerName",
        key: "customerName",
        width: 100,
        render: (text: string) => text || "-",
      },
      {
        title: "客户电话",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 130,
        render: (phones: string[]) => <TXCopyableTableCell copyText={phones} />,
      },
      {
        title: "客户微信",
        dataIndex: "wechatNumber",
        key: "wechatNumber",
        width: 120,
        render: (text: string[]) => (
          <div className="flex flex-col gap-1">
            {text?.map((wechat, index) => <div key={index}>{wechat}</div>) ||
              "-"}
          </div>
        ),
      },
      {
        title: "成交机构",
        dataIndex: "orgName",
        key: "orgName",
        width: 120,
        render: (text: string) => text || "-",
      },
      {
        title: "成交项目",
        dataIndex: "dataNames",
        key: "dataNames",
        width: 140,
        render: (text: string) => (
          <div className="flex flex-col gap-1">
            {text?.split(",").map((item, index) => (
              <Tag style={{ width: "fit-content" }} key={index}>
                {item.trim()}
              </Tag>
            )) || "-"}
          </div>
        ),
      },
      {
        title: "成交金额",
        dataIndex: "amount",
        key: "amount",
        width: 120,
        render: (text: string) => formatCurrency(text) || "-",
      },
      {
        title: "确认金额",
        dataIndex: "confirmAmount",
        key: "confirmAmount",
        width: 120,
        render: (text: string) => formatCurrency(text),
      },
      {
        title: "财务备注",
        dataIndex: "operateMemo",
        key: "operateMemo",
        width: 150,
        ellipsis: true,
        render: (text: string) => {
          return (
            <Tooltip placement={"top"} title={text ?? ""}>
              <p className={"max-w-[150px] truncate"}>{text ?? ""}</p>
            </Tooltip>
          );
        },
      },
      {
        title: "客户状态",
        dataIndex: "customerStatus",
        key: "customerStatus",
        width: 90,
        render: (status: CustomerStatus) => {
          const statusMap: { [key: string]: React.ReactNode } = {
            [CustomerStatus.EMPTY]: "-",
            [CustomerStatus.IN_PROGRESS]: <Tag color="processing">开发中</Tag>,
            [CustomerStatus.DEAL]: <Tag color="success">成交</Tag>,
            [CustomerStatus.REPEAT_PURCHASE]: <Tag color="blue">复购</Tag>,
          };
          return statusMap[status] || status;
        },
      },
      {
        title: "客户报备时间",
        dataIndex: "customerCreateTime",
        key: "customerCreateTime",
        width: 160,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "成交时间",
        dataIndex: "dealDate",
        key: "dealDate",
        width: 120,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD") : "-",
      },
      {
        title: "上报时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
        render: (text: string) =>
          text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-",
      },
      {
        title: "确认时间",
        dataIndex: "confirmDate",
        key: "confirmDate",
        width: 120,
        render: (text: string) => text || "-",
      },
      {
        title: "成交周期",
        dataIndex: "dealCycle",
        key: "dealCycle",
        width: 90,
        fixed: "right",
        render: (text: string) => text + "天" || "-",
      },
      {
        title: "操作",
        key: "action",
        width: 150,
        fixed: "right",
        render: (text: any, record: any) => {
          const { id } = record;
          return (
            <div className={"flex"}>
              {record.dealStatus !== "UN_CONFIRMED" ? (
                <Button
                  type="link"
                  size={"small"}
                  onClick={() => {
                    params.detailRef.current?.openModal({
                      id,
                    });
                  }}
                >
                  详情
                </Button>
              ) : (
                ""
              )}
              {record.dealStatus === "UN_CONFIRMED" && (
                <>
                  {DealManagementAuth.dealManagementConfirm && (
                    <Button
                      type={"link"}
                      size={"small"}
                      onClick={() => {
                        params.detailRef.current?.openModal({
                          id,
                          tabKey: "COMFIRM",
                        });
                      }}
                    >
                      确认
                    </Button>
                  )}
                  {DealManagementAuth.dealManagementCancel && (
                    <Button
                      type={"link"}
                      size={"small"}
                      onClick={() => {
                        params.detailRef.current?.openModal({
                          id,
                          tabKey: "CANCEL",
                        });
                      }}
                    >
                      作废
                    </Button>
                  )}
                </>
              )}
              {record.dealStatus !== "CONFIRMED" &&
                DealManagementAuth.dealManagementDelete && (
                  <Popconfirm
                    title="确认删除"
                    description="确定要删除这条成交记录吗？"
                    onConfirm={() => deleteDeal(record.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                      type={"link"}
                      size={"small"}
                      danger
                      loading={loading}
                    >
                      删除
                    </Button>
                  </Popconfirm>
                )}
            </div>
          );
        },
      },
    ],
    []
  );
}
