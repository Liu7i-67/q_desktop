export interface IReqBaseV1SysDictSave {
  /**@param 字典编码 */
  dictCode: string;
  /**@param 字典名称 */
  dictName: string;
  /**@param 禁用、启用 */
  enableFlag: boolean;
  /**@param 备注 */
  memo?: string;
}

export type IResBaseV1SysDictSave = boolean;
