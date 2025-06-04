export interface IReqBaseV1PlatformGetPage {
  /**@param 平台名称 */
  platformName?: string;
  /**@param 分页current */
  page?: number;
  /**@param 分页pageSize */
  size: number;
  /**@param 是否启用*/
  enableFlag?: boolean;
}

export interface IResBaseV1PlatformGetPage {
  /**@param 平台名称 */
  platformName: string;
  /**@param 禁用状态	 */
  enableFlag: boolean;
  /**@param 数据id */
  id: string;
  /**@param 备注 */
  memo: string;
  /**@parm 最后修改时间 */
  updateTime: string;
  /**@param 创建时间 */
  createTime: string;
}
