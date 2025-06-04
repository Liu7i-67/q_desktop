import { Service } from "@/utils/Axios";
import { IResList, IResDetail } from "@/utils/interface";
import {
  IReqBusinessV1CustomerFollowPersonalFollowPage,
  IResBusinessV1CustomerFollowPersonalFollowPage,
} from "@/service/business/v1/customer-follow/personal-follow-page";
import {
  IReqBusinessV1CustomerFollowPersonalFollowStat,
  IResBusinessV1CustomerFollowPersonalFollowStat,
} from "@/service/business/v1/customer-follow/personal-follow-stat";

/** @function 分页获取客户跟进信息 */
export const get_customer_follow_page = (
  params: IReqBusinessV1CustomerFollowPersonalFollowPage
) => {
  return Service.get("/api/business/v1/customer-follow/personal-follow-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CustomerFollowPersonalFollowPage>>;
};

/** @function 今日任务统计 */
export const get_today_task_statistics = (
  params: IReqBusinessV1CustomerFollowPersonalFollowStat
) => {
  return Service.get("/api/business/v1/customer-follow/personal-follow-stat", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerFollowPersonalFollowStat>>;
};
