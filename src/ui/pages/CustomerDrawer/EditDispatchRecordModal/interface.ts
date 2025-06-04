export interface IEditDispatchRecordModalProps {
  /** @function 操作成功之后 */
  onSuccess?: () => void;
}

export interface IEditDispatchRecordModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 客户id */
  customerId?: string;
  /** @param 客户电话 */
  phoneNumber?: string[];
}
