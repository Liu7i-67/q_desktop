import { IResBusinessV1CustomerFollowFollowBoardStatList } from "@/service/business/v1/customer-follow/follow-board-stat-list";

export interface IListOfConsultantsProps {
  visible?: boolean;
  /** @param 表格固定高度 */
  height?: string;
  /** @param 策略id */
  taskId?: string;
}

export interface IListOfConsultants
  extends IResBusinessV1CustomerFollowFollowBoardStatList {
  date?: string;
  [key: string]: any;
}
