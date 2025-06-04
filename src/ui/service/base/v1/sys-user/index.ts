export interface IReqBaseV1SysUserId {
  /**@param 员工id */
  id: string;
}

export interface IResBaseV1SysUserId {
  /**@param 创建时间 */
  createTime: string;
  /**@param 员工部门关联关系 */
  deptRelationDTOList: IDeptRelationListDTO[];
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 员工id */
  id: string;
  /**@param 最后登录时间 */
  lastLoginTime: string;
  /**@param 昵称 */
  nickname: string;
  /**@param 今日分配的客户数量 */
  numberOfCustomerAssignedToday: number;
  /**@param 关联机构id */
  orgId: string;
  /**@param 关联机构名称 */
  orgName: string;
  /**@param 手机号 */
  phoneNumber: string;
  /**@param 所属部门id集合 */
  relationDeptIds: string[];
  /**@param 所属部门名称，逗号隔开 */
  relationDeptNames?: string;
  /**@param 所属角色名称，逗号隔开 */
  relationRoleNames?: string;
  /**@param 员工角色关联关系 */
  roleRelationDTOList: IRoleRelationListDTO[];
  /**@param 最后修改时间 */
  updateTime: string;
  /**@param 员工账号 */
  userAccount: string;
  /**@param 员工姓名 */
  userName: string;
  /**@param 员工类型,可用值:CUSTOMER_SERVICE,CONSULTANT,ORG,BUSINESS,ACCOUNTANT */
  userType: string;
}

export interface IDeptRelationListDTO {
  /**@param 部门id */
  deptId: string;
  /**@param 部门名称 */
  deptName: string;
  /**@param 是否是部门负责人 */
  directorFlag: boolean;
  /**@param 员工启是否启用 */
  userEnableFlag: boolean;
  /**@param 员工id */
  userId: string;
}

export interface IRoleRelationListDTO {
  /**@param 角色id */
  roleId: string;
  /**@param 角色名称 */
  roleName: string;
  /**@param 员工id */
  userId: string;
}
