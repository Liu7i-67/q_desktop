import { IAdvertisingPlanManagement } from "../interface";

export interface IAdvertisingPlanManagementEditModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IAdvertisingPlanManagementEditModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  record?: IAdvertisingPlanManagement;
}
