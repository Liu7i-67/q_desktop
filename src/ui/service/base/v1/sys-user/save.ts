export interface IReqBaseV1SysUserSave {
  /**@param 员工_部门关联关系新增、修改通用DTO */
  deptList?: IDeptListDTO[];
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 主键id */
  id?: string;
  /**@param 昵称 */
  nickname?: string;
  /**@param 关联机构id */
  orgId?: string;
  /**@param 手机号 */
  phoneNumber: string;
  /**@param 角色id列表*/
  roleList?: string[];
  /**@param 员工账号 */
  userAccount: string;
  /**@param 员工姓名 */
  userName: string;
  /**@param 员工类型,可用值:CUSTOMER_SERVICE,CONSULTANT,ORG,BUSINESS,ACCOUNTANT*/
  userType: string;
  /**@param 关联的企业微信员工id */
  wecomUserId?: string;
}

export interface IDeptListDTO {
  /**@param 部门id */
  deptId: string;
  /**@param 是否是部门负责人 */
  directorFlag?: boolean;
  /**@param 员工id */
  userId?: string;
}

export type TResBaseV1SysUserSave = boolean;
