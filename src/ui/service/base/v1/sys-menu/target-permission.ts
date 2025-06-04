export interface IReqBaseV1SysMenuTargetPermission {
  /** @param 权限的对象类型 USER(0, "员工"),ROLE(1, "角色")*/
  targetEnum: string | number;
  /** @param 对象的id*/
  targetId: string | number;
}
