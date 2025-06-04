export interface ITXPeekModalProps {
  peekType?: TPeekType;
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export type TPeekType = "assigin" | "customer";

export interface ITXPeekModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 关键字 */
  keyword: string;
}
