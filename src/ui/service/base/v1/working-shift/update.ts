export interface IReqBaseV1WorkingShiftUpdate {
  /** @param 班次名称 */
  shiftName: string;
  /** @param 班次id */
  id?: string;
  /** @param 排班类型 */
  scheduleType: string;
  /** @param 排班开始时间 */
  startTime: string;
  /** @param 排班结束时间 */
  endTime: string;
  /** @param 配色 */
  frontendExtension: string;
}
