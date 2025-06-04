import { IResBusinessV1Customer } from "@/service/business/v1/customer";

export interface ICustomerDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface ICustomerDrawerRef {
  /** @function 打开弹窗 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeDrawer: () => void;
}

export interface IInitData {
  /** @param 客户id */
  customerId: string;
  /** @param 默认展示的Tab*/
  defaultTab?: TCustomerTab;
}

export interface ITabPageProps {
  /** @param 是否显示 */
  show: boolean;
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}

export type TCustomerTab =
  // 空白
  | "EMPTY"
  // 基础信息
  | "BASE_INFO"
  // 派单记录
  | "DISPATCH_RECORD"
  // 成交记录
  | "TRANSACTION_RECORD"
  // 跟进记录
  | "FOLLOW_UP_RECORD"
  // 客户记录
  | "CUSTOMER_RECORD"
  // 到院记录
  | "VISIT_RECORD"
  // 机构联系记录
  | "ORGANIZATION_RECORD";
