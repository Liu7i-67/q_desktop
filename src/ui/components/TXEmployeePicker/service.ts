import {
  IReqBaseV1SysUserdeptTreeAndUser,
  IResBaseV1SysUserdeptTreeAndUser,
} from "@/service/base/v1/sys-user/dept-tree-and-user";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 获取员工树 */
export const get_dept_tree_and_user = (
  params?: IReqBaseV1SysUserdeptTreeAndUser
) => {
  return Service.get("/api/base/v1/sys-user/dept-tree-and-user", {
    params,
  }) as Promise<IResDetail<IResBaseV1SysUserdeptTreeAndUser[]>>;
};
