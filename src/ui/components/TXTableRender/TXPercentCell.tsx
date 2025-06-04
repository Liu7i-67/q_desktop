// 用于展示百分比

import { cn } from "@/utils/tools";

export interface ITXPercentCellProps {
  /** @param 类名 */
  className?: string;
  /** @param 百分比 */
  percent?: string | number;
}

export const TXPercentCell = function TXPercentCell_(
  props: ITXPercentCellProps
) {
  const { className = "", percent } = props;

  const value = parseFloat(percent as string);
  if (typeof value !== "number" || Number.isNaN(value)) {
    return <div className={cn("wes max-w-full", className)}>-</div>;
  }

  let colorClass = "text-[#EC8100]";
  if (value >= 90) {
    colorClass = "text-[#00A73F]";
  } else if (value >= 60) {
    colorClass = "text-[#0867E9]";
  }

  return (
    <div className={cn("wes max-w-full", className, colorClass)}>{value}%</div>
  );
};
