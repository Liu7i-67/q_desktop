import {
  IReqBaseV1SysRoleGetPage,
  IResBaseV1SysRoleGetPage,
} from "@/service/base/v1/sys-role/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";
import {
  IReqBaseV1SysUserGetPage,
  IResBaseV1SysUserGetPage,
} from "@/service/base/v1/sys-user/get-page";

/** @function 分页查询角色列表*/
export const get_role_page = (params: IReqBaseV1SysRoleGetPage) => {
  return Service.get("/api/base/v1/sys-role/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1SysRoleGetPage>>;
};

/** @function 分页查询系统_员工*/
export const get_user_page = (params: IReqBaseV1SysUserGetPage) => {
  return Service.get("/api/base/v1/sys-user/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1SysUserGetPage>>;
};
