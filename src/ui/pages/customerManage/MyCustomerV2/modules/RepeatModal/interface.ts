export interface IRepeatModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IRepeatModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  keyword: string;
}
