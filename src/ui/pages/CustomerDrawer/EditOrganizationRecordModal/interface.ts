import { IOrganizationRecord } from "../OrganizationRecord";

export interface IEditOrganizationRecordModalProps {
  /** @function 成功之后 */
  onSuccess?: () => void;
}

export interface IEditOrganizationRecordModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 客户id */
  customerId: string;
  /** @param 编辑数据 */
  oldData?: IOrganizationRecord;
}
