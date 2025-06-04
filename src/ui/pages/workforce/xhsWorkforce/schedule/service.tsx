import { Service } from "@/utils/Axios";

// 按月查看排班情况
export const get_month_view = (params: {
  scheduleDate?: string;
  scheduleDateStart?: string;
  scheduleDateEnd?: string;
  scheduleType?: "LITTLE_RED_BOOK";
}) => {
  return Service.get("/api/base/v1/user-schedule/month-view", {
    params,
  });
};

// 按周查看排班情况
export const get_week_view = (params: {
  scheduleDate?: string;
  scheduleDateStart?: string;
  scheduleDateEnd?: string;
  scheduleType?: "LITTLE_RED_BOOK";
}) => {
  return Service.get("/api/base/v1/user-schedule/week-view", {
    params,
  });
};

// 修改用户排班
export const update_user_schedule = (data: any) => {
  return Service.put("/api/base/v1/user-schedule/update", { data });
};
