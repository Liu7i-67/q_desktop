export interface IEditEmployeeModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IEditEmployeeModalRef {
  /** @function 打开弹窗 */
  openModal: (recordId?: string) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}
