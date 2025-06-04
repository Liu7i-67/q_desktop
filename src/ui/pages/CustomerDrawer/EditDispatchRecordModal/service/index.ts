import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerDispatchAvailableOrg,
  IResBusinessV1CustomerDispatchAvailableOrg,
} from "@/service/business/v1/customer-dispatch/available-org";
import { IResDetail } from "@/utils/interface";
import { IResBaseV1PlatformProjectTypeTreeAndChild } from "@/service/base/v1/project-type/tree-and-child";
import { IReqBusinessV1CustomerDispatchSave } from "@/service/business/v1/customer-dispatch/save";

/** @function 获取用户可派单的机构 */
export const get_available_org = (
  params: IReqBusinessV1CustomerDispatchAvailableOrg
) => {
  return Service.get("/api/business/v1/customer-dispatch/available-org", {
    params,
  }) as Promise<IResDetail<IResBusinessV1CustomerDispatchAvailableOrg[]>>;
};

/** @function 获取项目分类树及子项目 */
export const get_project_tree = () => {
  return Service.get("/api/base/v1/project-type/tree-and-child") as Promise<
    IResDetail<IResBaseV1PlatformProjectTypeTreeAndChild[]>
  >;
};

/** @function 新增客户派单信息 */
export const save_dispatch = (data: IReqBusinessV1CustomerDispatchSave) => {
  return Service.post("/api/business/v1/customer-dispatch/save", { data });
};
