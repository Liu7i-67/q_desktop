import { HTMLAttributes } from "react";

export interface ITXSearchItemWrapperProps
  extends HTMLAttributes<HTMLDivElement> {
  /** @param 配置时的唯一标示符 */
  name: string;
  /** @param 配置时展示的名称 */
  label: React.ReactNode;
  /** @param 是否禁止配置 */
  disabledSetting?: boolean;
}

export const TXSearchItemWrapper = function TXSearchItemWrapper_(
  props: ITXSearchItemWrapperProps
) {
  const { name, label, disabledSetting, ...reset } = props;
  return <div {...reset}>{props.children}</div>;
};
