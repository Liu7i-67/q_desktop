export interface IReqBusinessV1CustomerFollowFollowBoardStat {
  /** @param 时间-开始 */
  endDateStart: string;
  /** @param 时间-结束 */
  endDateEnd: string;
  /** @param 所属策略  */
  taskStrategyIdList?: string[];
  /** @param 咨询师  */
  userIdList?: string[];
  /** @param 部门  */
  deptIdList?: string[];
  /** @param 是否查询总数 */
  searchTotalFlag?: boolean;
  /** @param 按部门查看 */
  groupByDeptFlag?: boolean;
  /** @param 按咨询师查看 */
  groupByUserFlag?: boolean;
}

export interface IResBusinessV1CustomerFollowFollowBoardStat {
  /** @param 已完成任务总数 */
  completedTaskCount: string;
  createBy?: any;
  createUserName?: any;
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
  endDate?: any;
  /** @param 任务完成率 */
  taskCompletionRate: number;
  /** @param 任务总数 */
  taskCount: string;
  /** @param 未完成任务总数 */
  waitCompletedTaskCount: string;
}
