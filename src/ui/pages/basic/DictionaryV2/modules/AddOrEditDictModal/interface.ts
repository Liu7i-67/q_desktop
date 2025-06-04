import { IinitData } from "./store/RootStore/interface";

export interface IAddOrEditDictModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IAddOrEditDictModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IinitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}
