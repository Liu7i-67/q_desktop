import {
  IReqBusinessV1CustomerDispatchDispatchPage,
  IResBusinessV1CustomerDispatchDispatchPage,
} from "@/service/business/v1/customer-dispatch/dispatch-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 分页获取医院的派单信息 */
export const get_dispatch_page = (
  params: IReqBusinessV1CustomerDispatchDispatchPage
) => {
  return Service.get("/api/business/v1/customer-dispatch/dispatch-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CustomerDispatchDispatchPage>>;
};
