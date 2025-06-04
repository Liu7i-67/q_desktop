import { IResBusinessV1TaskStartegyGetPage } from "@/service/business/v1/task-strategy/get-page";

export interface IManageStartgyProps {
  /**@param 组件是否可见 */
  visible: boolean;
  /**@function 是否编辑策略 */
  onSetManageStartgyEditId: (id: string) => void;
  /**@function 设置新增、编辑策略信息组件显示隐藏 */
  onStrategyVisibleChange: (visible: boolean) => void;
}

export interface IManageStartgy extends IResBusinessV1TaskStartegyGetPage {}
