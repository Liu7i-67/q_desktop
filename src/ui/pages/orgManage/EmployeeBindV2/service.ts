import { Service } from "@/utils/Axios";
import {
  IReqBaseV1UserOrganizationRelationGetPage,
  IResBaseV1UserOrganizationRelationGetPage,
} from "@/service/base/v1/user-organization-relation/get-page";
import { IResList } from "@/utils/interface";

/** @function 分页查询员工_机构关联关系*/
export const get_user_org_relation_page = (
  params: IReqBaseV1UserOrganizationRelationGetPage
) => {
  return Service.get("/api/base/v1/user-organization-relation/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1UserOrganizationRelationGetPage>>;
};

/** @function 删除员工_机构关联关系*/
export const delete_user_org_relation = (data: string[]) => {
  return Service.delete("/api/base/v1/user-organization-relation/delete", {
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
