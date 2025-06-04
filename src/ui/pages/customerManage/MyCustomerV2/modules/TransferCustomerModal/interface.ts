export interface ITransferCustomerModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface ITransferCustomerModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 转移客户ID */
  targetCustomerIds: string[];
}
