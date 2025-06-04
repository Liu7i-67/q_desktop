import { EUserType } from "@/utils/user-helper/interface";

export interface IReqBusinessV1DispatchMessageSave {
  /** @param 派单id */
  dispatchId: string;
  /** @param 留言内容 */
  message: string;
  /** @param 用户类型 */
  messageFrom: EUserType;
}
