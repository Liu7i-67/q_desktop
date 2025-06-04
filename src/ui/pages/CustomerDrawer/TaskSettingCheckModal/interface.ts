export interface ITaskSettingCheckModalProps {
  /** @function 关闭之后 */
  afterClose?: (
    cancelIds?: string[],
    /** @param 是否取消本次的下次跟进时间 true-是 */
    noNextDay?: boolean
  ) => void;
}

export interface ITaskSettingCheckModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
  /** @function 检查是否需要弹出多次任务信息 false需要终止请求提交 */
  checkPlan: (customerId: string, currentDate?: string) => Promise<boolean>;
}

export interface IInitData {}
