import { IActionParam } from "@/components/TXTreeSidebar/store/RootStore/interface";

export interface IAddOrEditTypeModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IAddOrEditTypeModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData extends IActionParam {}
