export enum TransferType {
  /**
   * 批量转移
   */
  SOME = "SOME",
  /**
   * 全量转移
   */
  ALL = "ALL",
}

/**
 * @resizeOptionGridWidth 页面resize时,option布局调整的临界值
 */
export const resizeOptionGridWidth = 1320;

export interface ITranstionData {
  createTime: string;
  deptRelationDTOList: any[];
  enableFlag: boolean;
  id: string;
  lastLoginTime?: string;
  nickname: string;
  numberOfCustomerAssignedToday: number;
  orgId?: any;
  orgName?: any;
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

export interface IRepeatResult {
  historyDispatchInfoDTO: {
    /** @param 历史曾被另外租户派过单 true-是 讨喜的true是被清颜派过 清颜的true是被讨喜派过 */
    dispatchedFromOtherTenantFlag?: boolean;
    /** @param 手机号 */
    phoneNumber?: string;
    /** @param 门店id */
    tenantId?: string;
    /** @param 门店名称 */
    tenantName?: string;
  };
  /** @param 重复原因 */
  repeatMessage?: string;
  /** @param 已存在的客户的id */
  existCustomerId?: string;
}
