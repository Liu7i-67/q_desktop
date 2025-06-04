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
  /** @param 班次名称 */
  shiftName: string;
  /** @param 班次id */
  id: string;
  /** @param 排班类型 */
  scheduleType: number;
  /** @param 排班开始时间 */
  startTime: string;
  /** @param 排班结束时间 */
  endTime: string;
  /** @param 配色 */
  frontendExtension: string;
}
