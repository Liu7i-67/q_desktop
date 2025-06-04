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
  /** @parma 平台id */
  id?: string;
  /** @parma 平台名称 */
  platformName: string;
  /** @parma 是否启用 */
  enableFlag?: boolean;
  /** @parma 备注 */
  memo?: string;
}
