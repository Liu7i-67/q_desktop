import { Service } from "@/utils/Axios";
import {
  IGetWorkingShiftList,
  IReqGetWeekViewData,
  IReqUpdateUserSchedule,
  IResWeekViewRecord,
  IResWorkingShift,
} from "./interface";
import { IResDetail } from "@/utils/interface";

/** @function 获取班次数据 */
export const get_working_shift_list = (params: IGetWorkingShiftList) => {
  return Service.get("/api/base/v1/working-shift/get-list", {
    params,
  }) as Promise<IResDetail<IResWorkingShift[]>>;
};

/** @function 获取周排班数据 */
export const get_week_view_data = (params: IReqGetWeekViewData) => {
  return Service.get("/api/base/v1/user-schedule/week-view", {
    params,
  }) as Promise<IResDetail<IResWeekViewRecord[]>>;
};

// 修改用户排班
export const update_user_schedule = (data: IReqUpdateUserSchedule) => {
  return Service.put("/api/base/v1/user-schedule/update", { data });
};
