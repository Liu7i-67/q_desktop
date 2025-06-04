// 用于展示标签内容联合字符串
// 组件行为：切割字符串，渲染为Tag

import { cn } from "@/utils/tools";
import { Tag, Tooltip } from "antd";

export interface ITXTagStrsProps {
  /** @param 类名 */
  className?: string;
  /** @param 联合字符串 */
  str?: string;
  /** @param 分隔符 默认为, */
  mark?: string;
}

export const TXTagStrs = function TXTagStrs_(props: ITXTagStrsProps) {
  const { className = "", str, mark = "," } = props;

  if (!str) {
    return <div className={className}>-</div>;
  }

  const list = str.split(mark);

  return (
    <div className={cn("flex flex-wrap gap-1 wes max-w-full", className)}>
      {list.map((t, index) => {
        return (
          <Tooltip title={t} key={index}>
            <Tag color="default" className="wes cursor-pointer">
              {t}
            </Tag>
          </Tooltip>
        );
      })}
    </div>
  );
};
