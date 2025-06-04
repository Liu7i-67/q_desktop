import { Service } from "@/utils/Axios";
import { IReqBaseV1SysUserUpdateSpecificField } from "@/service/base/v1/sys-user/update-specific-field";

/** @function 修改用户的指定信息 */
export const update_specific_field = (
  data: IReqBaseV1SysUserUpdateSpecificField
) => {
  return Service.put("/api/base/v1/sys-user/update-specific-field", {
    data,
  });
};
