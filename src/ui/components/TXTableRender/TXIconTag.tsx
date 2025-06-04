import { classNames, cn } from "@/utils/tools";

export interface TXIconTagProps {
  /** @param 图标 */
  icon?: string;
  /** @param 文本 */
  text: React.ReactNode;
  /** @param 颜色值 */
  color?: string;
}

export const TXIconTag = function TXIconTag_(props: TXIconTagProps) {
  const { icon, text, color = "#0867E9" } = props;

  return (
    <div
      className={classNames({
        "inline-flex box-border border-[1px] rounded-[5px] items-center justify-center gap-[5px] py-[4px] px-[6px] text-[14px] leading-[22px]":
          true,
      })}
      style={{
        borderColor: `${color}66`,
        color,
      }}
    >
      {icon && <i className={cn("iconfont", icon)}></i>}
      <span>{text}</span>
    </div>
  );
};
