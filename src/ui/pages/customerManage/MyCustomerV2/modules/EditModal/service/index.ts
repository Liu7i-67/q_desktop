import { IResBaseV1PlatformProjectTypeTreeAndChild } from "@/service/base/v1/project-type/tree-and-child";
import { IResBusinessV1CustomerDetail } from "@/service/business/v1/customer/detail";
import {
  IReqBusinessV1CustomerUpdate,
  IResBusinessV1CustomerUpdate,
} from "@/service/business/v1/customer/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**
 * @function 获取项目分类树
 */
export const get_project_type_tree = () => {
  return Service.get("/api/base/v1/project-type/tree") as Promise<
    IResDetail<IResBaseV1PlatformProjectTypeTreeAndChild[]>
  >;
};

/**
 * @function 获取客户信息详情
 */
export const get_customer_detail = (data: { id: string }) => {
  return Service.get(`/api/business/v1/customer/${data.id}`) as Promise<
    IResDetail<IResBusinessV1CustomerDetail>
  >;
};
/**
 * @function 新增客户信息
 */
export const save = (data: IReqBusinessV1CustomerUpdate) => {
  return Service.post("/api/business/v1/customer/save", { data }) as Promise<
    IResDetail<IResBusinessV1CustomerUpdate>
  >;
};

/**
 * @function 修改客户信息
 */
export const update = (data: IReqBusinessV1CustomerUpdate) => {
  return Service.put("/api/business/v1/customer/update", {
    data,
  }) as Promise<IResDetail<IResBusinessV1CustomerUpdate>>;
};
