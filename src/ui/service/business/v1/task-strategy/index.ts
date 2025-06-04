import { ICaretakerDTO, IExecutorDTO, ITaskContentDTO } from "./get-page";

export interface IReqBusinessV1TaskStartegyIndex {
  /**@param 数据id */
  id: string;
}

export interface IResBusinessV1TaskStartegyIndex {
  /**@param 管理人员*/
  caretaker: ICaretakerDTO;
  /**@param 创建人ID */
  createBy: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 任务策略关系信息 */
  executor: IExecutorDTO;
  /**@param 策略类型,可用值:AUTO_CREATE,MANUAL_CREATE */
  followSource: string;
  /**@param 数据id */
  id: string;
  /**@param 策略描述 */
  strategyDesc: string;
  /**@param 任务策略 */
  strategyName: string;
  /**@param 任务取消场景 */
  taskCancelScenario: string[];
  /**@param 任务策略内容-DTO */
  taskContent: ITaskContentDTO[];
  /**@param 任务创建场景 */
  taskCreateScenario: string[];
  /**@param 任务完成场景 */
  taskFinishScenario: string[];
  /**@param 任务接力场景 */
  taskRelayScenario: string[];
  /**@param 任务开始场景 */
  taskStartScenario: string[];
  /**@param 任务超时场景 */
  taskTimeoutScenario: string[];
  /**@param 更新人 */
  updateBy?: string;
  /**@param 更新时间 */
  updateTime?: string;
}
