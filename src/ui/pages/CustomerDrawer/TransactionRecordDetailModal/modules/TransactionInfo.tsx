import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import {
  ITXDescriptionItem,
  TXDescriptions,
} from "@/components/TXDescriptions";
import TXCustStatus from "@/components/TXCustStatus";
import { TXCopyableTableCell } from "@/components/TXCopyableTableCell";
import { formatCurrency } from "@/utils/tools";
import { dealStatusLabel } from "@/service/business/v1/customer-deal";

export const TransactionInfo = observer(function TransactionInfo_() {
  const root = useStore();
  const { logic } = root;

  const items: ITXDescriptionItem[] = [
    {
      label: "成交金额",
      children: `￥${formatCurrency(logic.detail?.amount || 0)}`,
    },
    {
      label: "确认金额",
      children: formatCurrency(logic.detail?.confirmAmount),
    },
    {
      label: "成交周期",
      children: logic.detail?.dealCycle || "-",
    },
    {
      label: "成交机构",
      children: logic.detail?.orgName || "-",
    },
    {
      label: "成交日期",
      children: logic.detail?.dealDate || "-",
    },
    {
      label: "上报时间",
      children: logic.detail?.createTime || "-",
    },
    {
      label: "确认时间",
      children: logic.detail?.confirmDate || "-",
    },
    {
      label: "成交状态",
      children: dealStatusLabel[logic.detail?.dealStatus || "NULL"],
    },
    {
      label: "备注",
      childrenSpan: 21,
      children: logic.detail?.memo || "-",
    },
  ];

  return (
    <div className="mt-8">
      <div className="text-[16px] font-bold text-primary mb-2 select-none">
        成交信息
      </div>
      <TXDescriptions items={items} size="small" border={false} gutter={12} />
    </div>
  );
});
