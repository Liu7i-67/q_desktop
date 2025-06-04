import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerGetPage,
  IResBusinessV1CustomerGetPage,
} from "@/service/business/v1/customer/get-page";
import { IResList } from "@/utils/interface";
import { IReqBusinessV1CustomerMerge } from "@/service/business/v1/customer/merge";

export interface IReqGetCustomerPage {
  data: IReqBusinessV1CustomerGetPage;
  params: {
    page: number;
    size: number;
  };
}

/**
 * @function 分页查询客户信息
 */
export const get_customer_page = (request: IReqGetCustomerPage) => {
  return Service.post("/api/business/v1/customer/get-page", {
    data: request.data,
    params: request.params,
  }) as Promise<IResList<IResBusinessV1CustomerGetPage>>;
};

/**
 * @function 合并客户
 */
export const merge_customer = (data: IReqBusinessV1CustomerMerge) => {
  return Service.post("/api/business/v1/customer/merge", {
    data,
  });
};
