import {
  IReqBusinessV1CustomerAssign,
  TResBusinessV1CustomerAssign,
} from "@/service/business/v1/customer/assign";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 指派客户 */
export const assign = (data: IReqBusinessV1CustomerAssign) => {
  return Service.post("/api/business/v1/customer/assign", {
    data,
  }) as Promise<IResDetail<TResBusinessV1CustomerAssign>>;
};
