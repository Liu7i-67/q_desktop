import { ETaskEunm } from "@/pages/WorkPlan/TaskStrategy/interface";

/**@param 任务创建场景下拉框选项 */
export const taskCreateOption = [
  {
    label: "新增用户协作员工",
    value: ETaskEunm.CREATE_COLLAB_INFO,
  },
  {
    label: "更新用户协作员工",
    value: ETaskEunm.UPDATE_COLLAB_INFO,
  },
];

/**@param 任务开始场景下拉框选项 */
export const taskStartOption = [
  {
    label: "达到任务开始时间",
    value: ETaskEunm.TASK_START_TIME,
  },
];

/**@param 任务取消场景下拉框选项 */
export const taskCancelOption = [
  {
    label: "更新用户协作员工",
    value: ETaskEunm.UPDATE_COLLAB_INFO,
  },
  {
    label: "删除用户协作员工",
    value: ETaskEunm.DELETE_COLLAB_INFO,
  },
];

/**@param 任务完成场景下拉框选项 */
export const taskFinishOption = [
  {
    label: "任务开始&截止时间内新增一条跟进内容",
    value: ETaskEunm.TASK_START_AND_DEADLINE_NEW_CONTENT,
  },
];

/**@param 任务完成场景下拉框选项 */
export const taskTimeoutOption = [
  {
    label: "任务开始&截至时间内未完成任务",
    value: ETaskEunm.TASK_START_AND_DEADLINE_NOT_COMPLETED,
  },
];

/**@param 任务创建条件下拉框选项 */
export const taskCreateConditionOption = [
  {
    label: "事件发生于18：00前",
    value: ETaskEunm.BEFORE_18_00,
  },
  {
    label: "事件发生于18：00后",
    value: ETaskEunm.AFTER_18_00,
  },
  {
    label: "不限条件",
    value: ETaskEunm.UNLIMITED,
  },
];

/**@param 默认勾选的管理人id */
export const defaultCheckedCaretaker: IDefaultCheckedCaretaker[] = [
  // 默认勾选孙崇圣的id
  {
    tenantId: "1",
    key: "347893307260534818", //讨喜
  },
  {
    tenantId: "2",
    key: "347893307260534819", //清颜
  },
];

export interface IDefaultCheckedCaretaker {
  key: string;
  tenantId: string;
}
