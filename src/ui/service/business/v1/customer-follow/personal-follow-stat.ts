export interface IReqBusinessV1CustomerFollowPersonalFollowStat {
  /** @param 客户id */
  customerId?: string;
  /** @param 员工 */
  userIdList?: string;
  /** @param 部门 */
  deptIdList?: string;
  /** @param 跟进时间-起 */
  followDateStart?: string;
  /** @param 跟进时间-止 */
  followDateEnd?: string;
  /** @param 是否来自工作台 */
  fromWorkspace?: boolean;
  /* @param 客户电话/微信 */
  customerKeyword?: string;
  /** @param 跟进人搜索标签枚举（今日任务 */
  searchTabEnum?:
    | "TODAY_END_UNFINISHED" //今日截止待完成
    | "TODAY_UNFINISHED"; //今日总待完成
}

export interface IResBusinessV1CustomerFollowPersonalFollowStat {
  /** @param 已完成任务量 */
  completeCount: number;
  /** @param 完成率 */
  completeRate: number;
  /** @param 剩余任务量 */
  restCount: number;
  /** @param 总任务量 */
  totalCount: number;
}
