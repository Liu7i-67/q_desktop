import {
  IReqBaseV1PlatformGetPage,
  IResBaseV1PlatformGetPage,
} from "@/service/base/v1/platform/get-page";
import {
  IReqBaseV1RegionTree,
  IResBaseV1RegionTree,
} from "@/service/base/v1/region/tree";
import {
  IReqBusinessV1CustomerGetPage,
  IResBusinessV1CustomerGetPage,
} from "@/service/business/v1/customer/get-page";
import {
  IReqBusinessV1CustomerPeek,
  IResBusinessV1CustomerPeek,
} from "@/service/business/v1/customer/peek";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/** @function 分页查询表格数据 */
export const get_page_data = (
  data: IReqBusinessV1CustomerGetPage,
  params: {
    page: number;
    size: number;
  }
) => {
  return Service.post("/api/business/v1/customer/get-page", {
    data,
    params,
  }) as Promise<IResList<IResBusinessV1CustomerGetPage>>;
};

/**@function 分页查询平台 */
export const get_platform_page = (params: IReqBaseV1PlatformGetPage) => {
  return Service.get("/api/base/v1/platform/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1PlatformGetPage>>;
};

/**@function 获取城市树 */
export const get_region_tree = (params?: IReqBaseV1RegionTree) => {
  return Service.get("/api/base/v1/region/tree", {
    params,
  }) as Promise<IResDetail<IResBaseV1RegionTree[]>>;
};

/**@function 查重客户电话/微信 */
export const get_repeat_user = (params: IReqBusinessV1CustomerPeek) => {
  return Service.get("/api/business/v1/customer/peek", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerPeek>>;
};
