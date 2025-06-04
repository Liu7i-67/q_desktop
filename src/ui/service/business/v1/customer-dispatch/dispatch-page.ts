import { TDispatchStatus } from "./customer-dispatch-page";

export interface IReqBusinessV1CustomerDispatchDispatchPage {
  page?: number;
  size?: number;
  createBy?: number;
  dispatchTimeStart?: string;
  dispatchTimeEnd?: string;
  keyword?: string;
  lastId?: number;
  orgId?: string;
  /** @param 状态 */
  dispatchStatusList?: string;
}

export interface IResBusinessV1CustomerDispatchDispatchPage {
  areaCode: string;
  createBy: string;
  createTime: string;
  createUserName: string;
  customerId: string;
  dataName?: any;
  dataNames: string;
  dispatchDataIdList: string[];
  dispatchItemIdList: string[];
  dispatchStatus: TDispatchStatus;
  historyDispatchInfoDTO?: any;
  id: string;
  memo: string;
  orgId: string;
  orgName: string;
  phoneNumber: string;
  tenantId?: any;
  updateTime?: any;
  wechatNumber: string;
}
