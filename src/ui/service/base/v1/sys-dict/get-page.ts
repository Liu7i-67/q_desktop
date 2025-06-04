export interface IReqBaseV1SysDictGetPage {
  /**@param 字典编码 */
  dictCode?: string;
  /**@param 字典名称 */
  dictName?: string;
  /**@param 页码 */
  page?: number;
  /**@param 页条数 */
  size: number;
}

export interface IResBaseV1SysDictGetPage {
  /**@param 创建时间 */
  createTime: string;
  /**@param 字典编码 */
  dictCode: string;
  /**@param 字典名称 */
  dictName: string;
  /**@param 禁用、启用 */
  enableFlag: boolean;
  /**@param 数据id */
  id: string;
  /**@param 备注 */
  memo: string;
  /**@param 最后修改时间 */
  updateTime: string;
}
