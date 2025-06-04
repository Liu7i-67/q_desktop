import TXCustStatus from "@/components/TXCustStatus";
import InfoItem from "@/components/deal-confirm-modal/deal-info/info-item";
import InfoTitle from "@/components/deal-confirm-modal/deal-info/info-title";
import { useSelector } from "@/components/deal-confirm-modal/store";
import { EDealStatus } from "@/components/deal-confirm-modal/types";
import { cn, formatCurrency } from "@/utils/tools";
import { Tooltip } from "antd";

const Info = () => {
  const state = useSelector((x) => x.state);

  const { dealInfo } = state;

  /**
   * @get_deal_status 返回成交状态
   * @param dealStatus
   */
  const get_deal_status = (dealStatus: EDealStatus) => {
    switch (dealStatus) {
      case EDealStatus.CANCELED:
        return "已取消";
      case EDealStatus.UN_CONFIRMED:
        return "待确认";
      case EDealStatus.CONFIRMED:
        return "已确认";
    }
  };

  return (
    <div>
      <InfoTitle title={"客户信息"} />
      <div className={"flex flex-wrap mb-8"}>
        <InfoItem label={"客户姓名"} content={dealInfo.customerName} />
        <InfoItem
          label={"客户状态"}
          content={<TXCustStatus status={dealInfo.customerStatus} />}
        />
        <InfoItem
          label={"客户电话"}
          content={
            dealInfo.phoneNumber && dealInfo.phoneNumber.length > 0
              ? dealInfo.phoneNumber.join(",")
              : "-"
          }
        />
        <InfoItem
          label={"客户微信"}
          content={
            <div className={"flex items-center"}>
              {dealInfo?.wechatNumber?.length > 0
                ? dealInfo?.wechatNumber?.[0]
                : "-"}
              {dealInfo?.wechatNumber?.length > 1 && (
                <Tooltip
                  trigger={"hover"}
                  color={"#ffffff"}
                  title={dealInfo?.wechatNumber?.map((wechat: string) => {
                    return <div className={"text-gray-500"}>{wechat}</div>;
                  })}
                >
                  <div
                    className={cn(
                      "ml-1.5 rounded-md text-[12px] cursor-pointer text-blue-500"
                    )}
                  >
                    更多
                  </div>
                </Tooltip>
              )}
            </div>
          }
        />
        <InfoItem label={"来源渠道"} content={dealInfo.channelName ?? "-"} />
        <InfoItem
          label={"建档时间"}
          content={dealInfo.customerCreateTime ?? "-"}
        />
      </div>
      <InfoTitle title={"成交信息"} />
      <div className={"flex flex-wrap mb-8"}>
        <InfoItem
          label={"成交金额"}
          content={`￥${formatCurrency(dealInfo.amount)}`}
          contentClassName={"text-money"}
        />
        <InfoItem
          label={"确认金额"}
          content={formatCurrency(dealInfo?.confirmAmount) ?? "-"}
        />
        <InfoItem label={"成交周期"} content={dealInfo.dealCycle} />
        <InfoItem label={"成交机构"} content={dealInfo.orgName} />
        <InfoItem label={"成交日期"} content={dealInfo.dealDate} />
        <InfoItem label={"上报时间"} content={dealInfo.createTime} />
        <InfoItem label={"确认时间"} content={dealInfo.confirmDate ?? "-"} />
        <InfoItem
          label={"成交状态"}
          content={get_deal_status(dealInfo.dealStatus)}
        />
        <InfoItem
          className={"w-full"}
          label={"备注"}
          content={
            <Tooltip title={dealInfo?.memo ?? ""} placement={"top"}>
              <p className={"w-[600px] truncate select-none"}>
                {dealInfo.memo ?? "-"}
              </p>
            </Tooltip>
          }
        />
      </div>
    </div>
  );
};

export default Info;
