import { IReqBusinessV1CustomerGetPage } from "./get-page";

type RequireKey<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};

export interface IReqBusinessV1CustomerPeek
  extends RequireKey<IReqBusinessV1CustomerGetPage, "keyword"> {}

export interface IResBusinessV1CustomerPeek {
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
  /** @param 客户id */
  customerId?: string;
  /** @param 客户重复列表 */
  repeatCustomerList: IRepeatCustomerListDTO[];
}

export interface IRepeatCustomerListDTO {
  areaCode: string;
  assignTime: string;
  channelId: string;
  channelName?: any;
  collabDTOList: any[];
  createBy: string;
  createTime: string;
  createUserName: string;
  customerName: string;
  customerStatus: string;
  customerType: string;
  id: string;
  intentionalProjectDTOList: any[];
  labelRelationDTOList: any[];
  lastDispatchDTO?: any;
  lastFollow?: any;
  leadsType: string;
  liveStreamerId?: any;
  liveStreamerName?: any;
  memo: string;
  ownerName: string;
  ownerUserId: string;
  phoneNumber: string[];
  platformId?: any;
  platformName?: any;
  redId: string;
  updateTime: string;
  wechatNumber: string[];
  wechatPassTime?: any;
  wechatQrCode?: any;
  wechatStatus: string;
}
