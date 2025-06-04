import { CustomerLeadsAuth } from "@/pages/customerLead/auth";
import { cn, handleCopy } from "@/utils/tools";
import { Button, Popconfirm, Tag, Tooltip } from "antd";
import { useMemo } from "react";
import { RefundStatus } from "./service";

export function useCol(params: {
  state: any;
  logic: any;
  api: { [key in string]: any };
}) {
  const { channel, platformList, streamerList, regionTree } = params.state;
  const {
    openAddModal,
    openAddModalUpdate,
    setUpdateModalId,
    setUpdateModalRecord,
    openCoordinateModal,
    handleDelete,
  } = params.logic;
  const { runDelete } = params.api;

  const renderChannelId = (record: any) => {
    // record.leadsType === "PLACE"
    //   ? `[投放]${
    //       channel.find((x: any) => x.id === record.channelId)?.channelName ||
    //       "-"
    //     }`
    //   : `[电商]${
    //       platformList.find((x: any) => x.id === record.platformId)
    //         ?.platformName
    //     }/${
    //       streamerList.find((x: any) => x.id === record.liveStreamerId)
    //         ?.streamerName
    //     }`;
    const text =
      record.leadsType === "PLACE"
        ? `[投放]${record.channelName}`
        : `[电商]${record.platformName}/${record.liveStreamerName}`;
    return (
      <Tooltip title={text ?? ""} placement={"top"}>
        <p className={cn("max-w-[200px] truncate", "cursor-pointer")}>
          {text ?? ""}
        </p>
      </Tooltip>
    );
  };

  return useMemo(
    () => [
      {
        title: "线索渠道",
        dataIndex: "channelId",
        key: "channelId",
        width: 180,
        render: (text: string, record: any) => renderChannelId(record),
      },
      {
        title: "客户id",
        dataIndex: "customerId",
        key: "customerId",
        width: 140,
        render: (text: string) => {
          return (
            <p
              className={"hover:underline hover:cursor-pointer text-[12px]"}
              onClick={() => {
                handleCopy(text);
              }}
            >
              {text || "-"}
            </p>
          );
        },
      },
      {
        title: "线索客户微信",
        dataIndex: "wechatNumber",
        key: "wechatNumber",
        width: 140,
        render: (text: string) => {
          return (
            <Tooltip placement={"top"} title={text}>
              <p
                className={cn(
                  "hover:underline cursor-pointer",
                  "w-[140px] truncate"
                )}
                onClick={() => {
                  handleCopy(text);
                }}
              >
                {text || "-"}
              </p>
            </Tooltip>
          );
        },
      },
      {
        title: "线索电话",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 120,
        render: (text: string) => {
          return (
            <p
              className={"hover:underline hover:cursor-pointer"}
              onClick={() => {
                handleCopy(text);
              }}
            >
              {text || "-"}
            </p>
          );
        },
      },
      // {
      //   title: "客户姓名",
      //   dataIndex: "customerName",
      //   key: "customerName",
      //   width: 120,
      //   render: (text: string) => {
      //     return (
      //       <p
      //         className={"hover:underline hover:cursor-pointer"}
      //         onClick={() => {
      //           handleCopy(text);
      //         }}
      //       >
      //         {text || "-"}
      //       </p>
      //     );
      //   },
      // },
      {
        title: "城市",
        dataIndex: "areaCode",
        key: "areaCode",
        width: 80,
        render: (text: any, record: any) => {
          // 匹配城市的方法
          const findArea = (list: any[]): any => {
            for (const item of list) {
              if (item.areaCode === record.areaCode) {
                return item;
              }
              if (item.childList?.length) {
                const found = findArea(item.childList);
                if (found) return found;
              }
            }
            return null;
          };

          const area = findArea(regionTree);
          return <p className={"w-[80px] truncate"}>{area?.areaName || "-"}</p>;
        },
      },
      {
        title: "退款状态",
        dataIndex: "refundStatus",
        key: "refundStatus",
        width: 150,
        render: (refundStatus: RefundStatus) => {
          const statusMap = {
            UN_REFUNDED: "未退款",
            REFUNDED: "已退款",
          };
          return (
            <Tag
              color={refundStatus === RefundStatus.REFUNDED ? "green" : "blue"}
            >
              {statusMap[refundStatus] || "-"}
            </Tag>
          );
        },
        filters: [
          { text: "未退款", value: RefundStatus.UN_REFUNDED },
          { text: "已退款", value: RefundStatus.REFUNDED },
        ],
        onFilter: (value: string, record: any) => record.refundStatus === value,
      },
      {
        title: "分配至",
        dataIndex: "assignUserName",
        key: "assignUserName",
        width: 140,
        render: (text: string) => text || "-",
      },
      {
        title: "分配时间",
        dataIndex: "assignTime",
        key: "assignTime",
        width: 160,
        render: (text: string) => text || "-",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 160,
        render: (text: string) => text || "-",
      },
      {
        title: "操作",
        key: "action",
        fixed: "right" as const,
        width: 120,
        render: (text: any, record: any) => {
          return (
            <div className={"flex items-center w-[120px]"}>
              {CustomerLeadsAuth.customerLeadsAssign && (
                <Button
                  type={"link"}
                  size={"small"}
                  onClick={() => {
                    openCoordinateModal();
                    // 设置编辑弹窗的id
                    setUpdateModalId(record.id);
                  }}
                >
                  指派
                </Button>
              )}
              {CustomerLeadsAuth.customerLeadsUpdate && (
                <Button
                  type={"link"}
                  size={"small"}
                  onClick={() => {
                    // 打开编辑弹窗
                    openAddModal();
                    // 设置为编辑状态
                    openAddModalUpdate();
                    // 设置编辑弹窗的id
                    setUpdateModalId(record.id);
                    // 记录表格数据
                    setUpdateModalRecord(record);
                  }}
                >
                  修改
                </Button>
              )}
              {CustomerLeadsAuth.customerLeadsDelete && (
                <Button
                  type="link"
                  danger
                  loading={runDelete.loading}
                  onClick={() => handleDelete(record)}
                >
                  删除
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [channel, platformList, streamerList, regionTree]
  );
}
