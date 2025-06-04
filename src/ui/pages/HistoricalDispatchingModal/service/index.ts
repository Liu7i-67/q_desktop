import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerDispatchDispatchHistoryPage,
  IResBusinessV1CustomerDispatchDispatchHistoryRecord,
} from "@/service/business/v1/customer-dispatch/dispatch-history-page";
import { IResList } from "@/utils/interface";

/** @function 获取历史派单数据 */
export const get_dispatch_history_page = (
  params: IReqBusinessV1CustomerDispatchDispatchHistoryPage
) => {
  return Service.get(
    "/api/business/v1/customer-dispatch/dispatch-history-page",
    {
      params,
    }
  ) as Promise<IResList<IResBusinessV1CustomerDispatchDispatchHistoryRecord>>;
};
