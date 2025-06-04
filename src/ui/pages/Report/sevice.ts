import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";
import { IResBaseV1SysDeptTree } from "@/service/base/v1/sys-dept/tree";
import { IReqBaseV1SysUserTodayAssignCount } from "@/service/base/v1/sys-user/today-assign-count";

/** @function 分页查询咨询师接单数据 */
export const today_assign_count = (
  params: IReqBaseV1SysUserTodayAssignCount
) => {
  return Service.get("/api/base/v1/sys-user/today-assign-count", {
    params,
  }) as Promise<IResList<IResBaseV1SysDeptTree[]>>;
};
