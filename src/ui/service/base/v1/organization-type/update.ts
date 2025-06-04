export interface IReqBaseV1OrganizationTypeUpdate {
  /**@param 主键id */
  id?: string;
  /**@param 分类备注 */
  memo?: string;
  /**@parm 上级分类id */
  parentId?: string;
  /**@param 分类名称 */
  typeName?: string;
}

export type TResBaseV1OrganizationTypeUpdate = boolean;
