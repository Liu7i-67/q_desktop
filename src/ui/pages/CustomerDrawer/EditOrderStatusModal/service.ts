import { IReqBusinessV1CustomerDispatchHandle } from "@/service/business/v1/customer-dispatch/handle";
import { Service } from "@/utils/Axios";

/** @function 更新派单状态 */
export const update_dispatch_status = (
  data: IReqBusinessV1CustomerDispatchHandle
) => {
  return Service.post("/api/business/v1/customer-dispatch/handle", {
    data,
  });
};
