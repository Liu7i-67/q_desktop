export interface IReqBusinessV1CustomerDealGetPage {
  confirmTimeEnd?: string;
  confirmTimeStart?: string;
  createTimeEnd?: string;
  createTimeStart?: string;
  createUserIdList?: string;
  customerId?: string;
  dataIdList?: string[];
  dealStatus?: TDealStatus;
  orgIdList?: string;
  pendingReviewFlag?: boolean;
  phoneNumber?: string;
  wechatNumber?: string;
  page: number;
  size: number;
}

export type TDealStatus = "UN_CONFIRMED" | "CONFIRMED" | "CANCELED" | "DEFAULT";

export const dealStatusInfo = {
  UN_CONFIRMED: { color: "blue", text: "未确认" },
  CONFIRMED: { color: "success", text: "已确认" },
  CANCELED: { color: "error", text: "已取消" },
  DEFAULT: { color: "default", text: "-" },
};

export interface IResBusinessV1CustomerDealGetPage {
  amount: number;
  channelName?: any;
  collabDTOList: any[];
  confirmAmount?: any;
  confirmDate?: any;
  confirmUserId?: any;
  createBy: string;
  createTime: string;
  createUserName: string;
  customerCreateTime: string;
  customerId: string;
  customerName: string;
  customerStatus: string;
  dataNames: string;
  dealCycle: number;
  dealDate: string;
  dealItemDTOList: any[];
  dealStatus: TDealStatus;
  id: string;
  memo?: any;
  operateMemo: string;
  orgId: string;
  orgName: string;
  phoneNumber: string[];
  reviewStatus: number;
  wechatNumber: string[];
}
