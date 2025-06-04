import {
  IReqBaseV1SysUserId,
  IResBaseV1SysUserId,
} from "@/service/base/v1/sys-user";
import {
  IReqBaseV1SysUserSave,
  TResBaseV1SysUserSave,
} from "@/service/base/v1/sys-user/save";
import {
  IReqBaseV1SysUserUpdate,
  TResBaseV1SysUserUpdate,
} from "@/service/base/v1/sys-user/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 获取员工详情 */
export const get_user_detail = (data: IReqBaseV1SysUserId) => {
  return Service.get(`/api/base/v1/sys-user/${data.id}`) as Promise<
    IResDetail<IResBaseV1SysUserId>
  >;
};

/**@function 新增员工 */
export const save_employee = (data: IReqBaseV1SysUserSave) => {
  return Service.post("/api/base/v1/sys-user/save", { data }) as Promise<
    IResDetail<TResBaseV1SysUserSave>
  >;
};

/**@function 修改员工 */
export const update_employee = (data: IReqBaseV1SysUserUpdate) => {
  return Service.put("/api/base/v1/sys-user/update", { data }) as Promise<
    IResDetail<TResBaseV1SysUserUpdate>
  >;
};
