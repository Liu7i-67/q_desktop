import {
  IReqBaseV1OrganizationTypeSave,
  TResBaseV1OrganizationTypeSave,
} from "@/service/base/v1/organization-type/save";
import {
  IReqBaseV1OrganizationTypeUpdate,
  TResBaseV1OrganizationTypeUpdate,
} from "@/service/base/v1/organization-type/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 新增机构分类 */
export const save_org_type = (data: IReqBaseV1OrganizationTypeSave) => {
  return Service.post("/api/base/v1/organization-type/save", {
    data,
  }) as Promise<IResDetail<TResBaseV1OrganizationTypeSave>>;
};

/**@function 修改机构分类 */
export const update_org_type = (data: IReqBaseV1OrganizationTypeUpdate) => {
  return Service.put("/api/base/v1/organization-type/update", {
    data,
  }) as Promise<IResDetail<TResBaseV1OrganizationTypeUpdate>>;
};
