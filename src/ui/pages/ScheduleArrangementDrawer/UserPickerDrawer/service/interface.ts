export interface IReqGetSysUserData {
  userName?: string;
  page: number;
  size: number;
}

export interface IResUserInfo {
  createTime: string;
  deptRelationDTOList: any[];
  enableFlag: boolean;
  id: string;
  lastLoginTime: string;
  nickname: string;
  numberOfCustomerAssignedToday: number;
  orgId?: string;
  orgName?: string;
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
