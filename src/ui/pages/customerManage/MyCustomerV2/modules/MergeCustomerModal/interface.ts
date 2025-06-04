export interface IMergeCustomerModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IMergeCustomerModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @description 客户id */
  id: string;
}

export enum WechatStatus {
  UN_PASSED = "UN_PASSED",
  PASSED = "PASSED",
  UN_DEFINED = "UN_DEFINED",
}

export enum CustomerStatus {
  EMPTY = "EMPTY",
  IN_PROGRESS = "IN_PROGRESS",
  DEAL = "DEAL",
  REPEAT_PURCHASE = "REPEAT_PURCHASE",
}
