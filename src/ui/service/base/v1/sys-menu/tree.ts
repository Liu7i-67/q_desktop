export interface IResBaseV1SysMenuTargetTree {
  /** @param 子级*/
  childList?: IResBaseV1SysMenuTargetTree[];
  dataScope?: any;
  dataScopeRange: string[];
  /** @param 权限id*/
  id: string;
  /** @param 备注*/
  memo?: string;
  /** @param 菜单code*/
  menuCode: string;
  /** @param 菜单名字*/
  menuName: string;
  /** @param 父级code*/
  parentCode?: string;
  /** @param 权限key*/
  permissionKey: string;
  sortNum: number;
}
