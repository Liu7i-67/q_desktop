export interface IReqBaseV1SysDictValueUpdate {
  /**@param 字典编码 */
  dictCode: string;
  /**@param 字典名称 */
  dictName: string;
  /**@param 字典值 */
  dictValue: string;
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 数据id */
  id: string;
  /**@param 备注 */
  memo?: string;
}

export type TResBaseV1SysDictValueUpdate = boolean;
