import { Service } from "@/utils/Axios";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { IResList, IResDetail } from "@/utils/interface";
import {
  IReqBaseV1RegionTree,
  IResBaseV1RegionTree,
} from "@/service/base/v1/region/tree";
import { IResBaseV1PlatformProjectTypeTreeAndChild } from "@/service/base/v1/project-type/tree-and-child";
import {
  IReqBusinessV1CustomerPeek,
  IResBusinessV1CustomerPeek,
} from "@/service/business/v1/customer/peek";
import { IReqGetCustomerPage } from "./interface";
/**
 * @function 分页查询客户信息
 */
export const get_customer_page = (request: IReqGetCustomerPage) => {
  return Service.post("/api/business/v1/customer/get-page", {
    data: request.data,
    params: request.params,
  }) as Promise<IResList<IResBusinessV1CustomerGetPage>>;
};

/**@function 查重客户电话/微信 */
export const get_repeat_user = (params: IReqBusinessV1CustomerPeek) => {
  return Service.get("/api/business/v1/customer/peek", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerPeek>>;
};

/**
 * @function 获取行政区划树
 */
export const get_region_tree = (params?: IReqBaseV1RegionTree) => {
  return Service.get("/api/base/v1/region/tree", {
    params,
  }) as Promise<IResDetail<IResBaseV1RegionTree[]>>;
};

/**
 * @function 获取项目分类树
 */
export const get_project_type_tree = () => {
  return Service.get("/api/base/v1/project-type/tree") as Promise<
    IResDetail<IResBaseV1PlatformProjectTypeTreeAndChild[]>
  >;
};
