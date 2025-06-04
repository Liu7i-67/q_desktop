import { Service } from "@/utils/Axios";
import {
  IReqBaseV1RegionTreeAndOrganization,
  IResBaseV1RegionTreeAndOrganization,
} from "@/service/base/v1/region/tree-and-organization";
import { IResDetail } from "@/utils/interface";
import { IReqBusinessV1CustomerDealSave } from "@/service/business/v1/customer-deal/save";

/** @function 获取行政区划及下属机构树 */
export const get_org_tree = (params?: IReqBaseV1RegionTreeAndOrganization) => {
  return Service.get("/api/base/v1/region/tree-and-organization", {
    params,
  }) as Promise<IResDetail<IResBaseV1RegionTreeAndOrganization[]>>;
};

/** @function 新增客户成交信息 */
export const save_customer_deal = (data: IReqBusinessV1CustomerDealSave) => {
  return Service.post("/api/business/v1/customer-deal/save", { data });
};
