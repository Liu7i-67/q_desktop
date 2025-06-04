import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerPeek,
  IResBusinessV1CustomerPeek,
} from "@/service/business/v1/customer/peek";
import { IResDetail } from "@/utils/interface";

/**@function 查重客户电话/微信 */
export const get_repeat_user = (params: IReqBusinessV1CustomerPeek) => {
  return Service.get("/api/business/v1/customer/peek", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerPeek>>;
};
