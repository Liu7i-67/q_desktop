import {
  ITXDescriptionItem,
  TXDescriptions,
} from "@/components/TXDescriptions";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { AddressHelper } from "@/utils/address-helper";
import { cn } from "@/utils/tools";
import { ITabPageProps } from "../interface";
import { Collaborator } from "./Collaborator";
import { CustomerIntentional } from "./CustomerIntentional";
import { CustomerLabel } from "./CustomerLabel";
import { CustomerStats } from "./CustomerStats";
import { WechatQrCode } from "./WechatQrCode";
import { customerTypeLabels } from "@/utils/enum/modules/customerType";

export interface IBaseInfoProps extends ITabPageProps {}

export const BaseInfo = function BaseInfo_(props: IBaseInfoProps) {
  const { show, detail } = props;

  const items: ITXDescriptionItem[] = [
    { label: "姓名", children: detail?.customerName || "-" },
    {
      label: "电话",
      children: <TXListRow list={detail?.phoneNumber} />,
    },
    {
      label: "所在城市",
      children: detail?.areaCode
        ? AddressHelper.getInstance().getAreaNamePath(detail.areaCode).join("/")
        : "-",
    },
    {
      label: "客户标签",
      children: <CustomerLabel detail={detail} />,
    },
    {
      label: "微信号",
      children: <TXListRow list={detail?.wechatNumber} />,
    },
    {
      label: "客户状态",
      children: <CustomerStats detail={detail} />,
    },
    {
      label: "来源渠道",
      children: detail?.channelName || "-",
    },
    {
      label: "来源平台",
      children: detail?.platformName || "-",
    },
    { label: "客户所有者", children: detail?.ownerName || "-" },
    { label: "创建时间", children: detail?.createTime || "-" },
    { label: "协作者", children: <Collaborator detail={detail} /> },
    {
      label: "客户类型",
      children: detail?.customerType
        ? customerTypeLabels[detail.customerType]
        : "-",
    },
    {
      label: "首次咨询项目",
      children: <CustomerIntentional detail={detail} />,
      childrenSpan: 21,
    },
    { label: "备注", children: detail?.memo || "-", childrenSpan: 21 },
    {
      label: "微信二维码",
      children: <WechatQrCode detail={detail} />,
      childrenSpan: 21,
    },
  ];

  return (
    <div className={cn(show ? "" : "hidden")}>
      <TXDescriptions items={items} className="m-2" />
    </div>
  );
};

export default BaseInfo;
