import { IResBusinessV1CustomerDeal } from "@/service/business/v1/customer-deal";

export interface ITransactionRecordDetailModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface ITransactionRecordDetailModalRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 成交记录id */
  id: string;
  /** @param 打开的页签 */
  tabKey?: TOptionType;
}

export type TOptionType =
  /** @param 无内容 */
  | "NONE"
  /** @param 确认 */
  | "COMFIRM"
  /** @param 取消 */
  | "CANCEL";

export interface ITransactionRecordDetail extends IResBusinessV1CustomerDeal {}
