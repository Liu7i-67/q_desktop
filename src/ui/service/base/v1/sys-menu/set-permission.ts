export interface IReqBaseV1SysMenuTargetSetPermission {
  /** @param 权限的对象类型 USER(0, "员工"),ROLE(1, "角色")*/
  targetEnum: string | number;
  /** @param 对象的id*/
  targetId: string | number;
  enableMenuList: {
    /** @param 菜单id*/
    menuId: string | number;
    /** @param 权限范围*/
    dataScopeEnum?: string;
  }[];
}
