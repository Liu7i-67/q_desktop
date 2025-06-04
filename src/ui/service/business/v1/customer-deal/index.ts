import { ECustomerStatus } from "@/components/TXCustStatus";

export interface IReqBusinessV1CustomerDeal {
  id: string;
}

export interface IResBusinessV1CustomerDeal {
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
  customerStatus: ECustomerStatus;
  dataNames: string;
  dealCycle: number;
  dealDate: string;
  dealItemDTOList: IResDealItemDTO[];
  dealStatus: TDealStatus;
  id: string;
  memo?: any;
  operateMemo: string;
  orgId: string;
  orgName: string;
  phoneNumber: string[];
  reviewStatus: number;
  wechatNumber: any[];
}

export type TDealStatus = "CANCELED" | "UN_CONFIRMED" | "CONFIRMED" | "NULL";

export const dealStatusLabel = {
  CANCELED: "已取消",
  UN_CONFIRMED: "待确认",
  CONFIRMED: "已确认",
  NULL: "-",
};

export interface IResDealItemDTO {
  amount: number;
  collaborateRatio?: any;
  collaboratorId?: any;
  confirmAmount?: any;
  confirmDate?: any;
  confirmUserId?: any;
  createTime: string;
  createUserName?: any;
  customerId: string;
  dataId: string;
  dataName: string;
  dataType: string;
  dealDate: string;
  dealId: string;
  dealStatus: string;
  id: string;
  orgId: string;
  updateTime: string;
}
