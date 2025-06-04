import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import {
  ITXDescriptionItem,
  TXDescriptions,
} from "@/components/TXDescriptions";
import TXCustStatus from "@/components/TXCustStatus";
import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { TXListRow } from "@/components/TXTableRender/TXListRow";

export const BaseInfo = observer(function BaseInfo_() {
  const root = useStore();
  const { logic } = root;

  const items: ITXDescriptionItem[] = [
    {
      label: "客户姓名",
      children: logic.detail?.customerName || "-",
    },
    {
      label: "客户状态",
      children: logic.detail?.customerStatus ? (
        <TXCustStatus status={logic.detail?.customerStatus} />
      ) : (
        "-"
      ),
    },
    {
      label: "客户电话",
      children: <TXListRow list={logic.detail?.phoneNumber} />,
    },
    {
      label: "客户微信",
      children: <TXListRow list={logic.detail?.wechatNumber} />,
    },
    {
      label: "来源渠道",
      children: logic.detail?.channelName || "-",
    },
    {
      label: "建档时间",
      children: logic.detail?.customerCreateTime || "-",
    },
  ];

  return (
    <div>
      <div className="text-[16px] font-bold text-primary mb-2 select-none">
        客户信息
      </div>
      <TXDescriptions items={items} size="small" border={false} gutter={12} />
    </div>
  );
});
