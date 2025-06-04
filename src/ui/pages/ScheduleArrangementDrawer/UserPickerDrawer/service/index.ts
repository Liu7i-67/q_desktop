import { Service } from "@/utils/Axios";
import { IReqGetSysUserData, IResUserInfo } from "./interface";
import { IResList } from "@/utils/interface";

/** @function 分页获取员工数据 */
export const get_sys_user_data = (params: IReqGetSysUserData) => {
  return Service.get("/api/base/v1/sys-user/get-page", {
    params,
  }) as Promise<IResList<IResUserInfo>>;
};
