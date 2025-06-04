export interface ICollaborationModalProps {
  /** @function 修改成功后 */
  onSuccess?: () => void;
}

export interface ICollaborationModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 客户id */
  existCustomerId: string;
  /** @param 是否只是添加 */
  justAdd?: boolean;
}
