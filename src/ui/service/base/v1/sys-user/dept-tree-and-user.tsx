export interface IReqBaseV1SysUserdeptTreeAndUser {
  /** @param 咨询师 */
  userType?: "CONSULTANT";
}

export interface IResBaseV1SysUserdeptTreeAndUser {
  childList: IResBaseV1SysUserdeptTreeAndUser[];
  createTime: string;
  deptFullName?: any;
  deptName: string;
  id: string;
  parentId?: any;
  updateTime: string;
  userDTOList: IResUserDTO[];
}

interface IResUserDTO {
  createTime: string;
  deptRelationDTOList: any[];
  enableFlag: boolean;
  id: string;
  lastLoginTime: string;
  nickname: string;
  numberOfCustomerAssignedToday: number;
  orgId: string;
  orgName: string;
  phoneNumber: string;
  relationDeptIds: string[];
  relationDeptNames: string;
  relationRoleNames: string;
  roleRelationDTOList: any[];
  updateTime: string;
  userAccount: string;
  userName: string;
  userType: string;
}
