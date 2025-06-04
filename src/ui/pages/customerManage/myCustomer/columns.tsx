import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";
import { MyCustomerAuth } from "@/pages/customerManage/myCustomer/auth";
import { AddressHelper } from "@/utils/address-helper";
import {
  cn,
  handleCopy,
  handleJudgeCustomerIdSmallThanTwoH,
} from "@/utils/tools";
import { Button, Dropdown, Tag, Tooltip } from "antd";
import { useMemo } from "react";
import { CustomerStatus, WechatStatus } from "./service";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";

export const useColumns = (params: {
  state: any;
  logic: any;
  collRef: React.RefObject<ICollaborationModalRef>;
  customerRef: React.RefObject<ICustomerDrawerRef>;
}) => {
  const { regionTree } = params.state;
  const collRef = params.collRef;
  const customerRef = params.customerRef;
  const {
    openEditModalUpdate,
    openEditModal,
    openCoordinateModal,
    openSendOrderModal,
    setUpdateModalId,
    setUpdateModalData,
    openDetailDrawer,
    openMergeCustomerModal,
  } = params.logic;
  // 处理点击事件
  const handleClick = (type: string, record: any) => {
    switch (type) {
      // 协作
      case "coordinate":
        {
          collRef.current?.openModal({ existCustomerId: record.id });
        }
        break;
      // 派单
      case "sendOrder":
        openSendOrderModal();
        // 设置派单弹窗的id和数据
        localStorage.setItem("updateModalId", record.id);
        localStorage.setItem("updateModalData", JSON.stringify(record));
        break;
      // 编辑
      case "edit":
        openEditModal();
        openEditModalUpdate();
        setUpdateModalId(record.id);
        break;
      // 详情
      case "detail":
        {
          customerRef.current?.openDrawer({
            customerId: record.id,
          });
        }
        // openDetailDrawer();
        // // 设置详情抽屉的id和数据
        // localStorage.setItem("updateModalId", record.id);
        // localStorage.setItem("updateModalData", JSON.stringify(record));
        break;
      // 客户合并
      case "mergeCustomer":
        localStorage.setItem("updateModalId", record.id);
        localStorage.setItem("updateModalData", JSON.stringify(record));
        openMergeCustomerModal();
        break;
      default:
        break;
    }
  };
  return useMemo(
    () => [
      {
        width: 40,
        fixed: "left",
        render: (_: any, record: any) => {
          const flag = handleJudgeCustomerIdSmallThanTwoH(
            record.customerId || record.id
          );
          return flag ? (
            <Tooltip title="该客户存在跨门店【派单】或【成交】记录，请在老系统或联系技术人员查看历史数据。">
              <div
                className={cn(
                  "text-white font-bold",
                  "flex justify-center items-center",
                  "w-[16px] h-[16px] rounded-[50%] cursor-pointer",
                  "bg-gradient-to-b from-yellow-500 to-yellow-400"
                )}
              >
                ?
              </div>
            </Tooltip>
          ) : (
            ""
          );
        },
      },
      {
        title: "归属人",
        dataIndex: "ownerName",
        key: "ownerName",
        width: 120,
        fixed: "left",
        render: (text: string, record: any) => {
          return <p className={"w-[120px] text-nowrap wes"}>{text}</p>;
        },
      },
      {
        title: "协作人",
        width: 120,
        fixed: "left",
        render: (_: any, record: any) => {
          const { collabDTOList, ownerUserId } = record;
          const nameList: string[] = [];
          collabDTOList.map((info: any) => {
            const { userId, userName } = info;
            if (userId !== ownerUserId) {
              nameList.push(userName);
            }
          });
          if (nameList.length === 0) {
            return <div className="w-[120px]">-</div>;
          }
          return (
            <div className="w-[120px] wes">
              {nameList.map((name: string, index) => {
                return (
                  <Tooltip title={name} key={index}>
                    <p className="wes">{name}</p>
                  </Tooltip>
                );
              })}
            </div>
          );
        },
      },
      {
        title: "客户微信",
        dataIndex: "wechatNumber",
        key: "wechatNumber",
        width: 100,
        fixed: "left",
        render: (text: string, record: any) => {
          const { wechatNumber } = record;
          return (
            <div className="w-[100px] wes">
              {wechatNumber.map((wechat: string, index: number) => {
                return (
                  <Tooltip
                    placement={"top"}
                    title={wechat}
                    key={`${wechat}_${index}`}
                  >
                    <p
                      className={cn(
                        "hover:underline cursor-pointer",
                        "w-[80px] truncate wes"
                      )}
                      onClick={() => {
                        handleCopy(wechat);
                      }}
                    >
                      {wechat || "-"}
                    </p>
                  </Tooltip>
                );
              })}
            </div>
          );
        },
      },
      {
        title: "客户电话",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 120,
        fixed: "left",
        render: (phoneNumbers: string[]) => (
          <TXCopyableTableCell copyText={phoneNumbers} />
        ),
      },
      {
        title: "报备时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 130,
        render: (text: string, record: any) => {
          return (
            <p className={"text-[12px] w-[130px]  text-nowrap wes"}>{text}</p>
          );
        },
      },
      {
        title: "最新跟进记录",
        dataIndex: "lastFollow",
        key: "lastFollow",
        width: 160,
        render: (_: string, record: any) => {
          const lastFollow = record.lastFollow || null;
          return (
            <div className="w-[160px] wes">
              {lastFollow ? (
                <>
                  <Tooltip title={lastFollow.memo ?? ""}>
                    <p className={"max-w-[150px] truncate"}>
                      {lastFollow.memo || "-"}
                    </p>
                  </Tooltip>
                  <span className="text-[#999] text-xs">
                    {lastFollow.createTime}
                  </span>
                </>
              ) : (
                "-"
              )}
            </div>
          );
        },
      },
      {
        title: "首次咨询项目",
        dataIndex: "intentionalProjectDTOList",
        key: "intentionalProjectDTOList",
        width: 150,
        render: (_: Text, record: any) => {
          const data = record.intentionalProjectDTOList || [];

          return data.length ? (
            <div className="flex w-[150px] wes flex-wrap gap-1">
              {data.map((item: any) => (
                <Tag key={item.dataId}>{item.dataName}</Tag>
              ))}
            </div>
          ) : (
            <div className="w-[150px]">-</div>
          );
        },
      },
      {
        title: "最新派单项目",
        dataIndex: "lastDispatchDTO",
        key: "lastDispatchDTO",
        width: 150,
        render: (_: string, record: any) => {
          const lastDispatchDTO = record.lastDispatchDTO || null;
          return lastDispatchDTO ? (
            <div className="w-[150px] wes">
              <Tooltip title={lastDispatchDTO.dataNames ?? ""}>
                <p className={"max-w-[150px] truncate"}>
                  {lastDispatchDTO.dataNames || "-"}
                </p>
              </Tooltip>
              <span className="text-[#999] text-xs">
                {lastDispatchDTO.createTime}
              </span>
            </div>
          ) : (
            <div className="w-[150px]">-</div>
          );
        },
      },
      {
        title: "城市",
        dataIndex: "areaCode",
        key: "areaCode",
        width: 80,
        render: (text: string) => {
          let areaList = text
            ? AddressHelper.getInstance().getAreaNamePath(text)
            : ["-"];
          return (
            <Tooltip placement={"top"} title={areaList.join("/")}>
              <p className={"w-[50px] truncate"}>
                {areaList[areaList.length - 1]}
              </p>
            </Tooltip>
          );
        },
      },
      {
        title: "微信通过状态",
        dataIndex: "wechatStatus",
        key: "wechatStatus",
        width: 120,
        render: (status: WechatStatus) => {
          const statusMap: { [key: string]: React.ReactNode } = {
            [WechatStatus.UN_PASSED]: <Tag color="error">未通过</Tag>,
            [WechatStatus.PASSED]: <Tag color="success">已通过</Tag>,
            [WechatStatus.UN_DEFINED]: <Tag color="cyan">待定中</Tag>,
          };
          return statusMap[status] || <Tag color="cyan">待定中</Tag>;
        },
      },
      {
        title: "客户状态",
        dataIndex: "customerStatus",
        key: "customerStatus",
        width: 120,
        // fixed: "right",
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
        title: "操作",
        key: "action",
        fixed: "right",
        width: 180,
        render: (text: string, record: any) => (
          <div className={"flex w-[180px] wes flex-wrap"}>
            {MyCustomerAuth.customerDispatch && (
              <Button
                type="link"
                size="small"
                onClick={() => handleClick("sendOrder", record)}
                // disabled={!record.collabUserIdList.includes(localStorage.getItem('id'))}
              >
                派单
              </Button>
            )}
            <Button
              type="link"
              size="small"
              onClick={() => handleClick("detail", record)}
            >
              详情
            </Button>
            {MyCustomerAuth.customerUpdate && (
              <Button
                type="link"
                size="small"
                onClick={() => handleClick("edit", record)}
                // disabled={!record.collabUserIdList.includes(localStorage.getItem('id'))}
              >
                编辑
              </Button>
            )}
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => {
                          handleClick("coordinate", record);
                        }}
                        disabled={!MyCustomerAuth.customerCreate}
                      >
                        协作
                      </Button>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => handleClick("mergeCustomer", record)}
                        disabled={!MyCustomerAuth.customerMerge}
                      >
                        合并
                      </Button>
                    ),
                  },
                ],
              }}
              trigger={["hover"]}
            >
              <Button size={"small"} type={"link"}>
                更多
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ],
    [regionTree]
  );
};
