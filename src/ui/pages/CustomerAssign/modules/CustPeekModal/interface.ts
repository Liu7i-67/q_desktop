import { IResBusinessV1CustomerPeek } from "@/service/business/v1/customer/peek";
import { ModalProps } from "antd";

export interface ICustPeekModalProps extends ModalProps {}

export interface ICustPeekModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IResBusinessV1CustomerPeek) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}
