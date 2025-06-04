import { IResBusinessV1CustomerFollowFollowCalendar } from "@/service/business/v1/customer-follow/follow-calendar";

export interface ITaskCalendarProps {
  visible?: boolean;
}

export interface IDayCell extends IResBusinessV1CustomerFollowFollowCalendar {
  /** @param 进度百分比 */
  ratio?: number;
  /** @param 类名 */
  className?: string;
}
