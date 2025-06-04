export interface IReqBusinessV1TaskStartegyGetPage {
  /**@param 权限数据类型,可用值:EXECUTOR-执行,CARETAKER-管理 */
  taskStrategyRole?: "EXECUTOR" | "CARETAKER";
  /**@param */
  searchCount?: string;
  /**@param */
  page: number;
  /**@param */
  size: number;
}

export interface IResBusinessV1TaskStartegyGetPage {
  /**@param 管理人员*/
  caretaker: ICaretakerDTO;
  /**@param 创建人ID */
  createBy: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 任务策略关系信息 */
  executor?: IExecutorDTO;
  /**@param 策略类型,可用值:AUTO_CREATE,MANUAL_CREATE */
  followSource: string;
  /**@param 数据id */
  id: string;
  /**@param 策略描述 */
  strategyDesc: string;
  /**@param 任务策略 */
  strategyName: string;
  /**@param 任务取消场景 */
  taskCancelScenario: string[];
  /**@param 任务策略内容-DTO */
  taskContent: string[];
  /**@param 任务创建场景 */
  taskCreateScenario: string[];
  /**@param 任务完成场景 */
  taskFinishScenario: string[];
  /**@param 任务接力场景 */
  taskRelayScenario: string[];
  /**@param 任务开始场景 */
  taskStartScenario: string[];
  /**@param 任务超时场景 */
  taskTimeoutScenario: string[];
  /**@param 更新人 */
  updateBy?: string;
  /**@param 更新时间 */
  updateTime?: string;
}

export interface ITaskContentDTO {
  /**@param 是否优先展示 */
  priorityFlag: boolean;
  /**@param 任务创建条件,可用值:BEFORE_18_00,AFTER_18_00,UNLIMITED */
  taskCreateCondition: string;
  /**@param 任务描述 */
  taskDesc: string;
  /**@param 任务截至时间 */
  taskEndTime: number;
  /**@param 任务开始时间 */
  taskStartTime: number;
  /**@param 策略任务id */
  taskStrategyId: string;
}

export interface ICaretakerDTO {
  /**@parma 系统_部门对象DTO */
  departmentList: IDepartmentListDTO[];
  /**@param 系统_员工对象DTO */
  userList: IUserListDTO[];
}

export interface IExecutorDTO {
  /**@parma 系统_部门对象DTO */
  departmentList: IDepartmentListDTO[];
  /**@param 系统_员工对象DTO */
  userList: IUserListDTO[];
}

export interface IDepartmentListDTO {
  /**@param 子部门 */
  childList: IDepartmentListDTO[];
  /**@param 创建时间 */
  createTime: string;
  /**@param 部门名称全路径 */
  deptFullName?: string;
  /**@param 部门名称 */
  deptName: string;
  /**@param 数据id */
  id: string;
  /**@param 上级部门id */
  parentId?: string;
  /**@param 修改时间 */
  updateTime: string;
  /**@param 系统_员工对象DTO */
  userDTOList: IUserListDTO[];
}

export interface IUserListDTO {
  /**@param 创建时间 */
  createTime: string;
  /**@param 员工_部门关联关系对象DTO */
  deptRelationDTOList: IdeptRelationListDTO[];
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 数据id */
  id: string;
  /**@param 最后登录时间 */
  lastLoginTime: string;
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
  relationDeptNames?: string;
  /**@param 所属角色名称，逗号隔开 */
  relationRoleNames?: string;
  /**@param 员工_角色关联关系对象DTO */
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

export interface IRoleRelationListDTO {
  /**@param 角色id */
  roleId: string;
  /**@param 角色名称 */
  roleName: string;
  /**@param 员工id */
  userId: string;
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
