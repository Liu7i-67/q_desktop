import { IResBusinessV1CustomerDispatchDispatchHistoryRecord } from "@/service/business/v1/customer-dispatch/dispatch-history-page";

export interface IHistoricalDispatchingModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IHistoricalDispatchingModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 电话号码 */
  phoneNumber?: string[];
}

export interface IHistoricalDispatchingRecord
  extends IResBusinessV1CustomerDispatchDispatchHistoryRecord {
  /** @param 状态文本 */
  dispatchStatusLabel: string;
  /** @param 时间文本 */
  dispatchDateText: string;
}
