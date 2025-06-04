import { TAction } from "@/utils/interface";
import { PopconfirmProps } from "antd";

export interface ITXTableActionProps {
  /** @param 操作配置 */
  actions: ITableAction[];
  /** @param 可以展开的数量 默认为3 超过3个时只展示2个，其他的收起到更多中 */
  maxCount?: number;
  /** @param 类名 */
  className?: string;
  /** @function 操作触发时 */
  onAction?: (action: TAction) => void;
}

export interface ITableAction {
  /** @param 操作名 */
  label: React.ReactNode;
  /** @param 操作类型 */
  type?: TAction;
  /** @param 图标 */
  icon?: string;
  /** @param 是否禁用 */
  disabled?: boolean;
  /** @param 禁用提示 */
  disabledTips?: React.ReactNode;
  /** @param 二次确认提示 */
  popconfirm?: PopconfirmProps;
  /** @param 权限 false不展示 */
  auth: boolean;
  /** @function 点击事件 */
  onClick?: () => void;
}
