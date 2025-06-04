import { TTodayTaskStatus } from "@/utils/enum/modules/todayTaskStatus";
import { IResCollabDTO } from "../customer";
import { LastDispatchDTO } from "../customer/get-page";

export interface IReqBusinessV1CustomerFollowGetPage {
  /** @param 所属策略id集合  */
  taskStrategyIdList?: string[];
  /** @param 客户所属人  */
  ownerUserIdList?: string[];
  /** @param 协作人  */
  collabUserIdList?: string[];
  /** @param 任务所属人  */
  userIdList?: string[];
  /** @param 电话微信 */
  customerKeyword?: string;
  /** @param 任务状态  */
  statusEnumList?: string[];
  /** @param 任务开始时间-结束 */
  startDateEnd?: string;
  /** @param 任务开始时间-开始 */
  startDateStart?: string;
  /** @param 任务完成时间-结束 */
  followedTimeEnd?: string;
  /** @param 任务完成时间-开始 */
  followedTimeStart?: string;
  /** @param 任务截止时间-开始 */
  endDateStart?: string;
  /** @param 任务截止时间-结束 */
  endDateEnd?: string;
  /** @param 客户id */
  customerId?: string;
  page?: number;
  size?: number;
  /** @param 跟进人搜索标签枚举（今日任务 */
  searchTabEnum?:
    | "TODAY_END_UNFINISHED" //今日截止待完成
    | "TODAY_UNFINISHED"; //今日总待完成

  /** @parma 跟进来源 */
  sourceEnum?: TSourceEnum;
  /** @param 是否按跟进记录降序排序 */
  orderByFollowedTimeFlag?: boolean;
}

export type TSourceEnum =
  // 自动创建
  | "AUTO_CREATE"
  // 手动创建
  | "MANUAL_CREATE";

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

export type TWechatStatus =
  // 未通过
  | "UN_PASSED"
  // 已通过
  | "PASSED"
  // 待定中
  | "UN_DEFINED";

export const wechatStatusInfo = {
  UN_PASSED: {
    text: "未通过",
    color: "#fc4e4b",
  },
  PASSED: {
    text: "已通过",
    color: "#32d16d",
  },
  UN_DEFINED: {
    text: "待定",
    color: "#2168f9",
  },
};

export type TCustomerStatus =
  // 空
  | "EMPTY"
  // 开发中
  | "IN_PROGRESS"
  // 成交
  | "DEAL"
  // 复购
  | "REPEAT_PURCHASE";

export const customerStatusInfo = {
  EMPTY: {
    text: "-",
    color: "default",
    icon: "icon-daikaishi",
  },
  IN_PROGRESS: {
    text: "开发中",
    color: "orange",
  },
  DEAL: {
    text: "成交",
    color: "success",
  },
  REPEAT_PURCHASE: {
    text: "复购",
    color: "processing",
  },
};
