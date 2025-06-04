import { Service } from "@/utils/Axios";
import { IReqBaseV1LoginChangePassword } from "@/service/base/v1/login/change-password";
import UserHelper from "@/utils/user-helper";

/** @function 修改密码 */
export const change_password = (data: IReqBaseV1LoginChangePassword) => {
  return Service.post("/api/base/v1/login/change-password", {
    data,
    headers: {
      Authorization: UserHelper.getInstance().token,
    },
  });
};
