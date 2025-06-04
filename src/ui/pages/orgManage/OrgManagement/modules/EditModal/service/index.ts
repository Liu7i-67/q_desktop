import {
  IReqBaseV1OrganizationId,
  IResBaseV1OrganizationId,
} from "@/service/base/v1/organization";
import {
  IReqBaseV1OrganizationSave,
  IResBaseV1OrganizationSave,
} from "@/service/base/v1/organization/save";
import {
  IReqBaseV1OrganizationUpdate,
  IResBaseV1OrganizationUpdate,
} from "@/service/base/v1/organization/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 获取机构详情 */
export const get_org_detail = (data: IReqBaseV1OrganizationId) => {
  return Service.get(`/api/base/v1/organization/${data.id}`) as Promise<
    IResDetail<IResBaseV1OrganizationId>
  >;
};

/** @function 新增机构 */
export const save_org = (data: IReqBaseV1OrganizationSave) => {
  return Service.post("/api/base/v1/organization/save", {
    data,
  }) as Promise<IResDetail<IResBaseV1OrganizationSave>>;
};

/** @function 修改机构 */
export const update_org = (data: IReqBaseV1OrganizationUpdate) => {
  return Service.put("/api/base/v1/organization/update", {
    data,
  }) as Promise<IResDetail<IResBaseV1OrganizationUpdate>>;
};
