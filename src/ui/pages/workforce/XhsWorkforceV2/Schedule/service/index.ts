import {
  IReqBaseV1UserScheduleMonthView,
  IResBaseV1UserScheduleMonthView,
} from "@/service/base/v1/user-schedule/month-view";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 按月查看排班情况*/
export const get_month_view = (params: IReqBaseV1UserScheduleMonthView) => {
  return Service.get("/api/base/v1/user-schedule/month-view", {
    params,
  }) as Promise<IResDetail<IResBaseV1UserScheduleMonthView[]>>;
};
