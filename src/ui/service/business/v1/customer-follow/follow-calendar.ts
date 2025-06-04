export interface IReqBusinessV1CustomerFollowFollowCalendar {
  /** @param 结束时间 */
  calendarEndTime: string;
  /** @param 开始时间 */
  calendarStartTime: string;
  /** @param 任务所属人 string[] */
  userIdList?: string;
}

export interface IResBusinessV1CustomerFollowFollowCalendar {
  /** @param 百分比 */
  rate?: number;
  /** @param 日期 */
  targetDay: string;
  /** @param 总数 */
  totalCount: string;
}
