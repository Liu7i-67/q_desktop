export interface IReqBaseV1LiveStreamerGetPage {
  /**@param 分页current */
  page: number;
  /**@param 分页pageSize */
  size: number;
  /**@param 主播姓名 */
  streamerName?: string;
  /**@param 是否启用 */
  enableFlag?: boolean;
}

export interface IResBaseV1LiveStreamerGetPage {
  /**@param 创建时间 */
  createTime: string;
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 主播id */
  id: string;
  /**@param 备注 */
  memo: string;
  /**@param 主播姓名 */
  streamerName: string;
  /**@param 更新时间 */
  updateTime: string;
}
