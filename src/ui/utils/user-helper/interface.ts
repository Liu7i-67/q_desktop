export interface ILoginInfo {
  /**
   * @deptIdLists 员工关联的部门id
   */
  deptIdLists: string[];
  /**
   * @id 用户id
   */
  id: string;
  /**
   * @nickName 昵称
   */
  nickname: string;
  /**
   * @orgId 员工所属机构id
   */
  orgId: string;
  /**
   * @permissionKey 权限key
   */
  permissionKey: number[];
  /**
   * @租户id
   */
  tenantId: string;
  /**
   * @tenantName 租户名称
   */
  tenantName: string;
  /**
   * @身份token
   */
  token: string;
  /**
   * @userName 用户名
   */
  userName: string;
  /**
   * @userType 用户类型
   */
  userType: EUserType;
  /**
   * @roleIdList 角色列表
   */
  roleIdList: string[];
}

/**
 * @EUserType 用户类型
 */
export enum EUserType {
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
  CONSULTANT = "CONSULTANT",
  ORG = "ORG",
  BUSINESS = "BUSINESS",
  ACCOUNTANT = "ACCOUNTANT",
  /** @param 流量 */
  TRAFFIC = "TRAFFIC",
}
