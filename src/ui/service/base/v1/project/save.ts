export interface IReqBaseV1ProjectSave {
  /**@param 是否启用 */
  enableFlag?: boolean;
  /**@param 主键id */
  id?: string;
  /**@param 项目描述 */
  memo?: string;
  /**@param 项目编码 */
  projectCode: string;
  /**@param 项目名称 */
  projectName: string;
  /**@param 项目分类id */
  typeId: string;
}

export type TResBaseV1ProjectSave = boolean;
