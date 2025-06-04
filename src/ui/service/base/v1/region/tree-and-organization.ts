import { IResBusinessV1CustomerDispatchAvailableOrg } from "@/service/business/v1/customer-dispatch/available-org";

export interface IReqBaseV1RegionTreeAndOrganization {
  /** @param 获取多少级 */
  maxLevel?: number;
  /** @param 机构是否启用 true-查启用的机构 */
  enableFlag?: boolean;
}

export interface IResBaseV1RegionTreeAndOrganization
  extends IResBusinessV1CustomerDispatchAvailableOrg {}
