import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerFollowGetPage,
  IResBusinessV1CustomerFollowGetPage,
} from "@/service/business/v1/customer-follow/get-page";
import { IResDetail, IResList } from "@/utils/interface";
import { IReqBusinessV1CustomerFollowDelete } from "@/service/business/v1/customer-follow/delete";
import {
  IReqBusinessV1CustomerFollowFollowCalendar,
  IResBusinessV1CustomerFollowFollowCalendar,
} from "@/service/business/v1/customer-follow/follow-calendar";

/** @function 任务清单-分页查询客户跟进信息 */
export const customer_follow_get_page = (
  params: IReqBusinessV1CustomerFollowGetPage
) => {
  const { size, page, ...data } = params;
  return Service.post("/api/business/v1/customer-follow/get-page", {
    params: {
      page,
      size,
    },
    data,
  }) as Promise<IResList<IResBusinessV1CustomerFollowGetPage>>;
};

/** @function 任务清单-取消任务-批量删除客户跟进信息 */
export const customer_follow_delete = (
  data: IReqBusinessV1CustomerFollowDelete
) => {
  return Service.delete("/api/business/v1/customer-follow/delete", {
    data: data.idList,
  });
};

/** @function 任务日历 */
export const customer_follow_calendar = (
  params: IReqBusinessV1CustomerFollowFollowCalendar
) => {
  return Service.get("/api/business/v1/customer-follow/follow-calendar", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerFollowFollowCalendar[]>>;
};
