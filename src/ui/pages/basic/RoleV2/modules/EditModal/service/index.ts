import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";
import { IResBaseV1SysRoleGetPage } from "@/service/base/v1/sys-role/get-page";
import { IReqBaseV1SysRoleUpdate } from "@/service/base/v1/sys-role/update";

/** @function 新增角色*/
export const save_role = (data: IReqBaseV1SysRoleUpdate) => {
  return Service.post("/api/base/v1/sys-role/save", {
    data,
  });
};

/**
 * @function 修改角色
 */
export const update_role = (data: IReqBaseV1SysRoleUpdate) => {
  return Service.put("/api/base/v1/sys-role/update", {
    data,
  });
};

/**
 * @function 获取角色详情
 */
export const get_role_detail = (id: string) => {
  return Service.get(`/api/base/v1/sys-role/${id}`) as Promise<
    IResDetail<IResBaseV1SysRoleGetPage>
  >;
};
