export interface ITaskStrategyProps {}

export enum ETaskEunm {
  /**@param 新增协作信息 */
  CREATE_COLLAB_INFO = "CREATE_COLLAB_INFO",
  /**@param 更新协作信息 */
  UPDATE_COLLAB_INFO = "UPDATE_COLLAB_INFO",
  /**@param 删除协作信息 */
  DELETE_COLLAB_INFO = "DELETE_COLLAB_INFO",
  /**@param 设置下次跟进时间 */
  SET_NEXT_FOLLOW_TIME = "SET_NEXT_FOLLOW_TIME",
  /**@param 达到任务开始时间 */
  TASK_START_TIME = "TASK_START_TIME",
  /**@param 任务开始&截至时间内新增一条更近内容 */
  TASK_START_AND_DEADLINE_NEW_CONTENT = "TASK_START_AND_DEADLINE_NEW_CONTENT",
  /**@param 任务开始&截至时间内未完成任务 */
  TASK_START_AND_DEADLINE_NOT_COMPLETED = "TASK_START_AND_DEADLINE_NOT_COMPLETED",
  /**@param 事件发生于18：00前*/
  BEFORE_18_00 = "BEFORE_18_00",
  /**@param 事件发生于18：00后*/
  AFTER_18_00 = "AFTER_18_00",
  /**@param 不限制条件*/
  UNLIMITED = "UNLIMITED",
}
