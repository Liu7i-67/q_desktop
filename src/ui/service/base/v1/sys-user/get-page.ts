export interface IReqBaseV1SysUserGetPage {
  /**@param 分配的客户数量阈值 */
  assignThreshold?: number;
  /**@param 分配时间 - 结束时间 */
  assignTimeEnd?: string;
  /**@param 分配时间 - 开始时间 */
  assignTimeStrat?: string;
  /**@param 所在部门合集 */
  deptIdList?: string[];
  /**@param 是否启用 */
  enableFlag?: boolean;
  /**@param 员工id集合 */
  idList?: string[];
  /**@param 关键字查询 */
  keyword?: string;
  /**@param 昵称 */
  nickname?: string;
  /**@param 今日分配的客户数量 */
  numberOfCustomerAssignedTodayFlag?: boolean;
  /**@param 手机号 */
  phoneNumber?: string;
  /**@param 排班日期 */
  scheduledDat?: string;
  /**@param 是否查询已排班的用户 */
  scheduledFlag?: boolean;
  /**@param 员工账号 */
  userAccount?: string;
  /**@param 员工姓名 */
  userName?: string;
  /**@param 员工类型,可用值:CUSTOMER_SERVICE,CONSULTANT,ORG,BUSINESS,ACCOUNTANT */
  userType?: string;
  /**@param 分页current */
  page: number;
  /**@param 分页pageSize */
  size: number;
}

export interface IResBaseV1SysUserGetPage {
  /**@param 创建时间 */
  createTime: string;
  /**@param 员工_部门关联关系对象DTO */
  deptRelationDTOList: IdeptRelationListDTO[];
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 员工id */
  id: string;
  /**@param 最后登录时间 */
  lastLoginTime?: string;
  /**@param 昵称 */
  nickname: string;
  /**@param 今日分配的客户数量 */
  numberOfCustomerAssignedToday: number;
  /**@param 关联机构id */
  orgId?: string;
  /**@param 关联机构名称 */
  orgName?: string;
  /**@param 手机号 */
  phoneNumber: string;
  /**@param 所属部门id集合 */
  relationDeptIds: string[];
  /**@param 所属部门名称，逗号隔开 */
  relationDeptNames: string;
  /**@param 所属角色名称，逗号隔开 */
  relationRoleNames: string;
  /**@param 员工_角色关联关系对象DTO */
  roleRelationDTOList: IroleRelationListDTO[];
  /**@param 最后修改时间 */
  updateTime: string;
  /**@param 员工账号 */
  userAccount: string;
  /**@param 员工姓名 */
  userName: string;
  /**@param 员工类型,可用值:CUSTOMER_SERVICE,CONSULTANT,ORG,BUSINESS,ACCOUNTANT */
  userType: string;
}

export interface IdeptRelationListDTO {
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

export interface IroleRelationListDTO {
  /**@param 角色id */
  roleId: string;
  /**@param 角色名称 */
  roleName: string;
  /**@param 员工id */
  userId: string;
}
