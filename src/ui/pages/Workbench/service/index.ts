import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";
import {
  IReqBusinessV1CustomerFollowGetPage,
  IResBusinessV1CustomerFollowGetPage,
} from "@/service/business/v1/customer-follow/get-page";
import {
  IReqBaseV1SysDeptTree,
  IResBaseV1SysDeptTree,
} from "@/service/base/v1/sys-dept/tree";

/** @function 获取部门树 */
export const get_sys_dept = (params: IReqBaseV1SysDeptTree) => {
  return Service.get("/api/base/v1/sys-dept/tree", {
    params,
  }) as Promise<IResDetail<IResBaseV1SysDeptTree[]>>;
};

/** @function 分页获取客户跟进信息 */
export const get_customer_follow_page = (
  params: IReqBusinessV1CustomerFollowGetPage
) => {
  const { size, page, ...data } = params;
  return Service.post("/api/business/v1/customer-follow/get-page", {
    params: {
      page,
      size,
    },
    data,
  }) as Promise<IResList<IResBusinessV1CustomerFollowGetPage>>;
};
