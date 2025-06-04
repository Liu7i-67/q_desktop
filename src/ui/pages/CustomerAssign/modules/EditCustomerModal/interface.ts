import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";

export interface IEditCustomerModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IEditCustomerModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData extends Partial<IResBusinessV1CustomerGetPage> {}
