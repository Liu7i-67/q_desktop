export interface IReqBusinessV1CustomerFollowFollowBoardStatList {
  page: number;
  size: number;
  /** @param 计划结束日期-止 */
  endDateEnd?: string;
  /** @param 计划结束日期-起 */
  endDateStart?: string;
  /** @param 任务策略  */
  taskStrategyIdList?: string[];
  /** @param 咨询师  */
  userIdList?: string[];
  /** @param 部门  */
  deptIdList?: string[];
  /** @param 按员工/咨询师查看 */
  groupByUserFlag?: boolean;
  /** @param 按部门查看 */
  groupByDeptFlag?: boolean;
  /** @param 按日期查看 */
  groupByDateFlag?: boolean;
  /** @param 是否查询总数 */
  searchTotalFlag?: boolean;
}

export interface IResBusinessV1CustomerFollowFollowBoardStatList {
  completedTaskCount: string;
  createBy?: string;
  /** @param 咨询师 */
  createUserName?: string;
  /** @param 时间段内截止的已完成任务数 */
  deadlineCompletedTaskCount: string;
  /** @param 时间段内截止的任务完成率 */
  deadlineTaskCompletionRate: number;
  /** @param 时间段内截止的任务总数  */
  deadlineTaskCount: string;
  /** @param 时间段内截止的未完成任务数 */
  deadlineWaitCompletedTaskCount: string;
  deptId?: any;
  deptName?: any;
  endDate?: string;
  /** @param 任务完成率 */
  taskCompletionRate: number;
  /** @param 任务总数 */
  taskCount: string;
  /** @param 未完成任务总数 */
  waitCompletedTaskCount: string;
}
