export interface IEditDealModalProps {
  /** @function 操作成功后的回调 */
  onSuccess?: () => void;
}

export interface IEditDealModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 派单id */
  dispatchId?: string;
  /** @param 客户id */
  customerId: string;
  /** @param 默认选中的机构id */
  orgId?: string;
}
