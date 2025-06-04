import { IResBusinessV1DispatchMessageGetPage } from "@/service/business/v1/dispatch-message/get-page";

export interface IOrderDispatchMessageModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IOrderDispatchMessageDrawerProps
  extends IOrderDispatchMessageModalProps {}

export interface IOrderDispatchMessageModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IOrderDispatchMessageDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  /** @param 派单id */
  dispatchId: string;
}

export interface IOrderDispatchMessage
  extends IResBusinessV1DispatchMessageGetPage {}
