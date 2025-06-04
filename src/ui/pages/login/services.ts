import { Service } from "@/utils/Axios";

/**
 * @Login 登录接口
 * @param data
 * @constructor
 */
export const Login = (data: {
  password: string;
  phone: string;
  tenantId: number;
}) => {
  return Service.post("/api/base/v1/login/login", {
    data,
  });
};
