import { IReqBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { IResBusinessV1CustomerPeek } from "@/service/business/v1/customer/peek";
export interface IMyCustomerV2Props {}
export interface IRepeatResult extends IResBusinessV1CustomerPeek {}

export enum WechatStatus {
  UN_PASSED = "UN_PASSED",
  PASSED = "PASSED",
  UN_DEFINED = "UN_DEFINED",
}

export enum CustomerStatus {
  EMPTY = "EMPTY",
  IN_PROGRESS = "IN_PROGRESS",
  DEAL = "DEAL",
  REPEAT_PURCHASE = "REPEAT_PURCHASE",
}

export interface IReqGetCustomerPage {
  data: IReqBusinessV1CustomerGetPage;
  params: {
    page: number;
    size: number;
  };
}

export interface ITreeData {
  label: string;
  value: string;
  children?: ITreeData[];
}
