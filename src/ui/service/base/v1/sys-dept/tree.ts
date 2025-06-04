export interface IReqBaseV1SysDeptTree {
  /**@param 部门id */
  deptId?: string;
  /**@param 部门名称 */
  deptName?: string;
  /**@param 是否忽略权限 */
  ignorePermission?: boolean;
}

export interface IResBaseV1SysDeptTree {
  /**@param 子部门 */
  childList?: IResBaseV1SysDeptTree[];
  /**@param 创建时间 */
  createTime?: string;
  /**@param 部门名称全路径 */
  deptFullName?: string;
  /**@param 部门名称 */
  deptName?: string;
  /**@param 数据id */
  id?: string;
  /**@param 上级部门id */
  parentId?: string;
  /**@param 修改时间 */
  updateTime?: string;
  /**@param 用户列表 */
  userDTOList?: IUserListDTO[];
}

export interface IUserListDTO {
  /**@param 创建时间 */
  createTime?: string;
  deptRelationDTOList?: IDeptRelationListDTO[];
  /**@param 是否启用 */
  enableFlag?: boolean;
  /**@param 员工id */
  id?: string;
  /**@param 最后登录时间 */
  lastLoginTime?: string;
  /**@param 昵称 */
  nickname?: string;
  /**@param 今日分配的客户数量 */
  numberOfCustomerAssignedToday?: number;
  /**@param 关联机构id */
  orgId?: string;
  /**@param 关联机构名称 */
  orgName?: string;
  /**@param 手机号 */
  phoneNumber?: string;
  /**@param 所属部门id集合 */
  relationDeptIds?: string[];
  /**@param 所属部门名称，逗号隔开 */
  relationDeptNames?: string;
  /**@param 所属角色名称，逗号隔开 */
  relationRoleNames?: string;
  /**@param 员工_角色关联关系对象DTO */
  roleRelationDTOList?: IRoleRelationListDTO[];
  /**@param 最后修改时间 */
  updateTime?: string;
  /**@param 员工账号 */
  userAccount?: string;
  /**@param 员工姓名 */
  userName?: string;
  /**@param 员工类型,可用值:CUSTOMER_SERVICE,CONSULTANT,ORG,BUSINESS,ACCOUNTANT */
  userType?: string;
}

export interface IDeptRelationListDTO {
  /**@param 部门id */
  deptId?: string;
  /**@param 部门名称 */
  deptName?: string;
  /**@param 是否是部门负责人 */
  directorFlag?: boolean;
  /**@param 员工启是否启用 */
  userEnableFlag?: boolean;
  /**@param 员工id */
  userId?: string;
}

export interface IRoleRelationListDTO {
  /**@param 角色id*/
  roleId?: string;
  /**@param 角色名称 */
  roleName?: string;
  /**@param 员工id */
  userId?: string;
}
