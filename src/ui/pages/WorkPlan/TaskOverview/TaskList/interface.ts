import {
  IResBusinessV1CustomerFollowGetPage,
  TCustomerStatus,
  TWechatStatus,
} from "@/service/business/v1/customer-follow/get-page";

export interface ITaskListProps {
  visible?: boolean;
}

export interface ITaskList extends IResBusinessV1CustomerFollowGetPage {
  /** @param 客户是否存在跨门店【派单】或【成交】记录 true-存在 */
  hasCrossStoreRecord: boolean;
  /** @param 客户归属人 */
  ownerName?: string;
  /** @param 协作人 */
  collabList?: string[];
  /** @param 客户电话 */
  phoneNumber?: string[];
  /** @param 客户微信 */
  wechatNumber?: string[];
  /** @param 微信通过状态 */
  wechatStatus: TWechatStatus;
  /** @param 客户状态 */
  customerStatus: TCustomerStatus;
  [key: string]: any;
}
