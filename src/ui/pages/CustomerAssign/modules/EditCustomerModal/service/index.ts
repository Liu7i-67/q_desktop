import {
  IReqBusinessV1CustomerUpdateFiled,
  TResBusinessV1CustomerUpdateFiled,
} from "@/service/business/v1/customer/update-field";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 编辑客户*/
export const update_customer_filed = (
  data: IReqBusinessV1CustomerUpdateFiled
) => {
  return Service.put("/api/business/v1/customer/update-field", {
    data,
  }) as Promise<IResDetail<TResBusinessV1CustomerUpdateFiled>>;
};
