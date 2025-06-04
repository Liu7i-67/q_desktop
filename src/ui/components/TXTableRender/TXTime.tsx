// 用于时间展示
// 组件行为安装format格式展示时间

import { cn } from "@/utils/tools";
import dayjs from "dayjs";

export interface ITXTimeProps {
  /** @param 类名 */
  className?: string;
  /** @param 时间 */
  time?: string | number;
  /** @param 分隔符 默认为, */
  format?: "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" | string;
}

export const TXTime = function TXTime_(props: ITXTimeProps) {
  const { className = "", time, format = "YYYY-MM-DD" } = props;

  if (!time) {
    return <div className={className}>-</div>;
  }

  return (
    <div className={cn("wes", className)}>{dayjs(time).format(format)}</div>
  );
};
