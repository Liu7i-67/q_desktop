import { IResBusinessV1LiveStreamerCustomerGetLiveStreamCustomer } from "@/service/business/v1/live-streamer-customer/get-live-stream-customer";
export interface ILiveDataDetailSecondDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface ILiveDataDetailSecondDrawerRef {
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

export interface ILiveDataDetailSecondRecord
  extends IResBusinessV1LiveStreamerCustomerGetLiveStreamCustomer {}
