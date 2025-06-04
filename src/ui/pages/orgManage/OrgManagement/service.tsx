import {
  IReqBaseV1OrganizationGetPage,
  IResBaseV1OrganizationGetPage,
} from "@/service/base/v1/organization/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 分页查询机构管理 */
export const get_organization_page_data = (
  params: IReqBaseV1OrganizationGetPage
) => {
  return Service.get(`/api/base/v1/organization/get-page`, {
    params,
  }) as Promise<IResList<IResBaseV1OrganizationGetPage>>;
};
