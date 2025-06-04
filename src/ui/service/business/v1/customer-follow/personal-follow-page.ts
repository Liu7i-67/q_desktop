import { TTodayTaskStatus } from "@/utils/enum/modules/todayTaskStatus";
import { IResCollabDTO } from "../customer";
import { LastDispatchDTO } from "../customer/get-page";

export interface IReqBusinessV1CustomerFollowPersonalFollowPage {
  page?: number;
  size?: number;
  /** @param 跟进人搜索标签枚举（今日任务 */
  searchTabEnum?:
    | "TODAY_END_UNFINISHED" //今日截止待完成
    | "TODAY_UNFINISHED"; //今日总待完成
}

export interface IResBusinessV1CustomerFollowPersonalFollowPage {
  createTime: string;
  customerDTO: IResBusinessV1CustomerFollowCustomerDTO;
  customerId: string;
  /** @param 任务截止时间 */
  endDate?: string;
  /** @param 任务完成时间 */
  followedTime?: string;
  id: string;
  lastCreateTime: string;
  lastForgetFlag?: any;
  lastMemo: string;
  memo: string;
  priorityFlag?: any;
  /** @param 开始日期 */
  startDate?: string;
  taskDesc?: any;
  updateTime: string;
  /** @param 所属策略 */
  strategyName?: string;
  /** @param 任务所属人 */
  createUserName?: string;
  /** @param 任务状态 */
  statusEnum?: TTodayTaskStatus;
  /** @param 所属人id */
  ownerUserId?: string;
}

export interface IResBusinessV1CustomerFollowCustomerDTO {
  areaCode: string;
  channelId?: any;
  channelName?: any;
  collabDTOList: IResCollabDTO[];
  createBy?: any;
  createTime: string;
  customerLeadsDTO?: any;
  customerName: string;
  /** @param 客户状态 */
  customerStatus: TCustomerStatus;
  customerType: string;
  id: string;
  intentionalProjectDTOList: any[];
  labelRelationDTOList: any[];
  lastDispatchDTO: LastDispatchDTO;
  lastFollow: IResBusinessV1CustomerFollowGetPage;
  leadsId: string;
  memo?: any;
  ownerName: string;
  ownerUserId: string;
  phoneNumber: string[];
  updateTime: string;
  wechatNumber: string[];
  wechatPassTime?: any;
  wechatStatus: TWechatStatus;
}

export interface IResBusinessV1CustomerFollowGetPage {
  createTime: string;
  customerDTO: IResBusinessV1CustomerFollowCustomerDTO;
  customerId: string;
  /** @param 任务截止时间 */
  endDate?: string;
  /** @param 任务完成时间 */
  followedTime?: string;
  id: string;
  lastCreateTime: string;
  lastForgetFlag?: any;
  lastMemo: string;
  memo: string;
  priorityFlag?: any;
  /** @param 开始日期 */
  startDate?: string;
  taskDesc?: any;
  updateTime: string;
  /** @param 所属策略 */
  strategyName?: string;
  /** @param 任务所属人 */
  createUserName?: string;
  /** @param 任务状态 */
  statusEnum?: TTodayTaskStatus;
  /** @param 所属人id */
  ownerUserId?: string;
}

export type TWechatStatus =
  // 未通过
  | "UN_PASSED"
  // 已通过
  | "PASSED"
  // 待定中
  | "UN_DEFINED";

export type TCustomerStatus =
  // 空
  | "EMPTY"
  // 开发中
  | "IN_PROGRESS"
  // 成交
  | "DEAL"
  // 复购
  | "REPEAT_PURCHASE";
