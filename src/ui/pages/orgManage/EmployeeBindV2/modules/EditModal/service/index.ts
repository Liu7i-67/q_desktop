import { Service } from "@/utils/Axios";
import { IResBaseV1UserOrganizationRelationGetPage } from "@/service/base/v1/user-organization-relation/get-page";
import { IResDetail } from "@/utils/interface";
import { IReqBaseV1UserOrganizationRelationUpdate } from "@/service/base/v1/user-organization-relation/update";

/** @function 获取员工_机构关联关系详情*/
export const get_user_org_relation_detail = (userId: string) => {
  return Service.get(
    `/api/base/v1/user-organization-relation/${userId}`
  ) as Promise<IResDetail<IResBaseV1UserOrganizationRelationGetPage[]>>;
};

/**
 * @function 新增员工_机构关联关系
 */
export const save_user_org_relation = (
  data: IReqBaseV1UserOrganizationRelationUpdate
) => {
  return Service.post("/api/base/v1/user-organization-relation/save", { data });
};

/**
 * @function 编辑员工_机构关联关系
 */
export const update_user_org_relation = (
  data: IReqBaseV1UserOrganizationRelationUpdate
) => {
  return Service.put("/api/base/v1/user-organization-relation/update", {
    data,
  });
};
