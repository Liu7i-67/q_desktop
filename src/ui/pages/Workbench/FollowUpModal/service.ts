import { Service } from "@/utils/Axios";
import { IReqBusinessV1CustomerFollowSave } from "@/service/business/v1/customer-follow/save";

/**
 * @save_customer_follow 新增客户跟进信息
 */
export const save_customer_follow = (
  data: IReqBusinessV1CustomerFollowSave
) => {
  return Service.post("/api/business/v1/customer-follow/save", {
    data,
  });
};
