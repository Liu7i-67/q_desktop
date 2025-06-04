import {
  IReqBaseV1SysDeptTree,
  IResBaseV1SysDeptTree,
} from "@/service/base/v1/sys-dept/tree";
import {
  IReqBaseV1SysUserGetPage,
  IResBaseV1SysUserGetPage,
} from "@/service/base/v1/sys-user/get-page";
import {
  IReqBaseV1SysUserRestPassword,
  TResBaseV1SysUserRestPassword,
} from "@/service/base/v1/sys-user/reset-password";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/**@function 分页查询员工 */
export const get_sys_user_page = (params: IReqBaseV1SysUserGetPage) => {
  return Service.get("/api/base/v1/sys-user/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1SysUserGetPage>>;
};

/**@function 获取部门树 */
export const get_dept_tree = (params: IReqBaseV1SysDeptTree) => {
  return Service.get("/api/base/v1/sys-dept/tree", {
    params,
  }) as Promise<IResDetail<IResBaseV1SysDeptTree[]>>;
};

/**@function 重置密码 */
export const rest_password = (data: IReqBaseV1SysUserRestPassword) => {
  return Service.put("/api/base/v1/sys-user/reset-password", {
    headers: {
      "Content-Type": "application/json",
    },
    data: data.id,
  }) as Promise<IResDetail<TResBaseV1SysUserRestPassword>>;
};
