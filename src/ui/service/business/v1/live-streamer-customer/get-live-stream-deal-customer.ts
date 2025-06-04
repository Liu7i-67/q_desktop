import { IResBusinessV1CustomerGetPage } from "../customer/get-page";

export interface IReqBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer {
  /** @param 页码*/
  page?: number;
  /** @param 每页条数*/
  size?: number;
  /** @param 开始时间*/
  createTimeStart?: string;
  /** @param 结束时间*/
  createTimeEnd?: string;
  /** @param 主播id*/
  liveStreamerIdList?: string[];
  /** @param 平台id*/
  platformIdList?: string[];
}

export interface IResBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer
  extends IResBusinessV1CustomerGetPage {}
