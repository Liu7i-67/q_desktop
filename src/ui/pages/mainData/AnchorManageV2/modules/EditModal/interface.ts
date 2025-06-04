export interface IEditModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IEditModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 主播id */
  id: string;
}
