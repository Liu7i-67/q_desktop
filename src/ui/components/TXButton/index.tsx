import { classNames, cn } from "@/utils/tools";
import { Button, Tooltip } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import { DOMAttributes, ReactNode } from "react";

export interface TXButtonProps extends BaseButtonProps {
  disabledTips?: React.ReactNode;
  auth?: boolean;
  /** @param 图标 */
  icon?: string;
}
export interface TXButtonProps extends DOMAttributes<HTMLButtonElement> {}

export const TXButton = function TXButton_(props: TXButtonProps) {
  const { disabledTips, auth, icon, className = "", ...rest } = props;

  if (auth === false) {
    return null;
  }

  let content = props.children;
  let extraClass = "";

  if (icon) {
    extraClass = "px-[4px]";
    content = (
      <i
        className={classNames({
          iconfont: true,
          [icon]: true,
        })}
      ></i>
    );
  }

  if (props.icon || (props.disabled && disabledTips)) {
    return (
      <Tooltip
        title={
          <div>
            <div>操作名称：{props.children}</div>
            {disabledTips && <div>禁用原因：{disabledTips}</div>}
          </div>
        }
      >
        <Button className={cn(className, extraClass)} {...rest}>
          {content}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button className={cn(className, extraClass)} {...rest}>
      {content}
    </Button>
  );
};
