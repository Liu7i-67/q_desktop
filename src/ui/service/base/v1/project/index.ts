export interface IReqBaseV1ProjectId {
  /**@param 请求数据详情的数据项id */
  id: string;
}

export interface IResBaseV1ProjectId {
  /**@param 创建时间 */
  createTime: string;
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 数据id */
  id: string;
  /**@param 项目描述 */
  memo: string;
  /**@param 项目编码 */
  projectCode: string;
  /**@param 项目名称 */
  projectName: string;
  /**@param 项目分类全路径 */
  typeFullName?: any;
  /**@param 项目分类id */
  typeId: string;
  /**@param 最后修改时间 */
  updateTime: string;
}
