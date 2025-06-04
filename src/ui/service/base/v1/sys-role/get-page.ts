export interface IReqBaseV1SysRoleGetPage {
  /**@param 角色名称 */
  roleName?: string;
  /**@param 分页current */
  page?: number;
  /**@param 分页pageSize */
  size: number;
}

export interface IResBaseV1SysRoleGetPage {
  /**@param 创建时间 */
  createTime?: string;
  /**@param 角色id */
  id: string;
  /**@param 备注 */
  memo?: string;
  /**@param 角色名称 */
  roleName: string;
}
