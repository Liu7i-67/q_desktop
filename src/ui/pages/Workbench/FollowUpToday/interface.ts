import { IResBusinessV1CustomerFollowGetPage } from "@/service/business/v1/customer-follow/get-page";

export interface IFollowUpTodayProps {
  /** @param 当前是否可见 */
  visible?: boolean;
}

export interface ICustomerFollowRecordWeb
  extends IResBusinessV1CustomerFollowGetPage {
  /** @param 客户是否存在跨门店【派单】或【成交】记录 true-存在 */
  hasCrossStoreRecord?: boolean;
}
