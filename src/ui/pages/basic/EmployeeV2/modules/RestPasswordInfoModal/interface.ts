export interface IRestPasswordInfoModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IRestPasswordInfoModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /**@param 密码 */
  password: string;
}
