export interface IFollowUpModalProps {
  /**@function 确认成功后回调函数 */
  onSuccess?: () => void;
}

export interface IFollowUpModalInit {
  /** @param 客户id */
  customerId: string;
  /** @param 上次的跟进id */
  id?: string;
}

export interface IFollowUpModalRef {
  /**@function 打开跟进弹窗 */
  openModal: (iniData?: IFollowUpModalInit) => void;
  /**@function 关闭跟进弹窗 */
  closeModal: () => void;
}
