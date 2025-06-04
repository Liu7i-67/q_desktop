import { IResBusinessV1CustomerFollowFollowBoardStatList } from "@/service/business/v1/customer-follow/follow-board-stat-list";
import { Dayjs } from "dayjs";

export interface IPastListOfConsultantsProps {
  visible?: boolean;
  /** @param 表格固定高度 */
  height?: string;
  /** @param 策略id */
  taskId?: string;
  /** @param 日期 */
  endDate: [Dayjs, Dayjs];
}

export interface IPastListOfConsultants
  extends IResBusinessV1CustomerFollowFollowBoardStatList {
  [key: string]: any;
}
