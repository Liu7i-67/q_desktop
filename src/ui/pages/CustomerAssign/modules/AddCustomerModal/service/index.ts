import {
  IReqBusinessV1CustomerSave,
  IResBusinessV1CustomerSave,
} from "@/service/business/v1/customer/save";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 新增客户线索 */
export const save_customer = (data: IReqBusinessV1CustomerSave) => {
  return Service.post("/api/business/v1/customer/save", {
    data,
  }) as Promise<IResDetail<IResBusinessV1CustomerSave>>;
};
