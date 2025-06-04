import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerCollabDetail,
  IResBusinessV1CustomerCollabDetail,
} from "@/service/business/v1/customer-collab/detail";
import { IResDetail } from "@/utils/interface";
import { IReqBusinessV1CustomerCollabUpdate } from "@/service/business/v1/customer-collab/update";

/** @function 获取客户的协作关系 */
export const getCustomerCollabDetail = (
  params: IReqBusinessV1CustomerCollabDetail
) => {
  return Service.get("/api/business/v1/customer-collab/detail", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerCollabDetail[]>>;
};

/** @function 修改客户协作关系 */
export const update_collab = (data: IReqBusinessV1CustomerCollabUpdate) => {
  return Service.put("/api/business/v1/customer-collab/update", { data });
};
