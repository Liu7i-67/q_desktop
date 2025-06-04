import { IResBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer } from "@/service/business/v1/live-streamer-customer/get-live-stream-deal-customer";

export interface ILiveDataDealDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface ILiveDataDealDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  /** @param 主播id*/
  liveStreamerIdList: string[];
  /** @param 平台id*/
  platformIdList?: string[];
  /** @param 开始时间*/
  createTimeStart?: string;
  /** @param 结束时间*/
  createTimeEnd?: string;
}

export interface ILiveDataDealDrawerRecord
  extends IResBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer {}
