import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";
import { IResBaseV1SysMenuTargetTree } from "@/service/base/v1/sys-menu/tree";
import { IReqBaseV1SysMenuTargetPermission } from "@/service/base/v1/sys-menu/target-permission";
import { IReqBaseV1SysMenuTargetSetPermission } from "@/service/base/v1/sys-menu/set-permission";

/** @function 获取权限菜单树*/
export const get_menu_tree = () => {
  return Service.get("/api/base/v1/sys-menu/tree") as Promise<
    IResDetail<IResBaseV1SysMenuTargetTree[]>
  >;
};

/** @function 获取目标对象的权限*/
export const get_target_permission = (
  params: IReqBaseV1SysMenuTargetPermission
) => {
  return Service.get("/api/base/v1/sys-menu/target-permission", {
    params,
  }) as Promise<IResDetail<IResBaseV1SysMenuTargetTree[]>>;
};

/** @function 设置权限*/
export const set_permission = (data: IReqBaseV1SysMenuTargetSetPermission) => {
  return Service.post("/api/base/v1/sys-menu/set-permission", {
    data,
  });
};
