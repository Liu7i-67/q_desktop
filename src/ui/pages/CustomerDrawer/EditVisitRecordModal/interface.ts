export interface IEditVisitRecordModalProps {
  /** @function 操作成功之后 */
  onSuccess?: () => void;
}

export interface IEditVisitRecordModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 客户id */
  customerId?: string;
}
