export interface IReqBaseV1SysDeptId {
  /** @param 部门详情信息id */
  id: string;
}

export interface IResBaseV1SysDeptId {
  /**@param 子部门 */
  childList: IResBaseV1SysDeptId[];
  /**@parm 创建时间 */
  createTime: string;
  /**@param 部门名称全路径 */
  deptFullName: string;
  /**@param 部门名称 */
  deptName: string;
  /**@param 数据id */
  id: string;
  /**@param 上级部门id */
  parentId: string;
  /**@param 修改时间 */
  updateTime: string;
  /**@param 系统_员工对象DTO */
  userDTOList: IUserListDTO[];
}

export interface IUserListDTO {
  /**@parm 创建时间 */
  createTime: string;
  /**@param 员工_部门关联关系对象DTO */
  deptRelationDTOList: IDeptRelationListDTO[];
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 员工id */
  id: string;
  /**@param 最后登录时间 */
  lastLoginTime: string;
  /**@param 昵称 */
  nickName: string;
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
  relationDeptNames: string[];
  /**@param 所属角色名称，逗号隔开 */
  relationRoleNames: string[];
  /**@param 员工_角色关联关系对象DTO */
  roleRelationDTOList: IDeptRelationListDTO[];
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
  /**@param 员工id */
  roleId: string;
  /**@param 角色名称 */
  roleName: string;
  /**@param 员工id */
  userId: string;
}
