export interface IReqBusinessV1CustomerFollowSave {
  /**@param 跟进内容 */
  memo: string;
  /**@param 下次跟进时间 */
  nextDate?: string;
  /**@param 客户id */
  customerId: string;
  /**@param 上一条跟进记录id */
  lastFollowId?: string;
  /** @param 需要取消的跟进任务 */
  cancelFollowIds?: string[];
}
