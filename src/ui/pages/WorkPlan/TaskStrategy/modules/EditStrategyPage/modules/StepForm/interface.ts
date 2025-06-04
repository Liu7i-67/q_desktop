import { TTXTreeCascaderNode } from "@/components/TXTreeCascader/store/RootStore/interface";
import { ITaskContentDTO } from "@/service/business/v1/task-strategy/get-page";
import { TRecord } from "@/utils/interface";
import { IEditStrategyPageProps } from "../../interface";
import { ISteopOneForm, ISteopTwoForm } from "./store/RootStore/interface";

export interface IStepFormProps
  extends Pick<
    IEditStrategyPageProps,
    "onStrategyVisibleChange" | "manageStartgyEditId"
  > {
  /**@param 步骤条进度 */
  stepCurrent: number;
  /**@function 步骤更改 */
  onSetStepCurrent: (step: number) => void;
  /**@function 设置新增、编辑策略信息组件显示隐藏 */
  onStrategyVisibleChange: (visible: boolean) => void;
}

export interface IStepFormRef {}

export enum EFollowSource {
  /**@param 自动化流程任务 */
  AUTO_CREATE = "AUTO_CREATE",
  /**@param 自定义下次跟进任务 */
  MANUAL_CREATE = "MANUAL_CREATE",
}
export interface ISumbitFormValues {
  /**@param 选择弹窗选择的管理人 */
  caretaker: TTXTreeCascaderNode[];
  /**@param 选择弹窗选择的执行人 */
  executor: TTXTreeCascaderNode[];
  /**@param 策略类型,可用值:AUTO_CREATE,MANUAL_CREATE */
  followSource?: string;
  /**@param 策略描述 */
  strategyDesc?: string;
  /**@param 任务策略 */
  strategyName?: string;
  /**@param 任务取消场景 */
  taskCancelScenario?: string[];
  /**@param 任务策略内容-DTO */
  taskContent?: ITaskContentDTO[];
  /**@param 任务创建场景 */
  taskCreateScenario?: string[];
  /**@param 任务完成场景 */
  taskFinishScenario?: string[];
  /**@param 任务接力场景 */
  taskRelayScenario?: string[];
  /**@param 任务开始场景 */
  taskStartScenario?: string[];
  /**@param 任务超时场景 */
  taskTimeoutScenario?: string[];
}

export interface IGernerateFormValue
  extends ISteopOneForm,
    ISteopTwoForm,
    TRecord {}
