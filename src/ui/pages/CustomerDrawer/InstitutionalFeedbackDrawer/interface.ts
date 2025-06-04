import { IResBusinessV1DispatchItemRecord } from "@/service/business/v1/dispatch-item-record/get-page";

export interface IInstitutionalFeedbackDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IInstitutionalFeedbackDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  /** @param 派单记录id */
  dispatchItemIdList?: string[];
}

export interface IInstitutionalFeedbackRecord
  extends IResBusinessV1DispatchItemRecord {}
