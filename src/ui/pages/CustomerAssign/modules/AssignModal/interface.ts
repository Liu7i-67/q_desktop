import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";

export interface IAssignModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IAssignModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IResBusinessV1CustomerGetPage) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}
