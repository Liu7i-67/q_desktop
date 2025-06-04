/**
 * @ESearchType 侧边栏类型
 */
export enum ESearchType {
  /**
   * 角色
   */
  ROLE = "ROLE",
  /**
   * 员工
   */
  USER = "USER",
}

export const EDataScopeRangeMap: { [key in string]: any } = {
  /**
     * SELF(0, "本人"),
     DEPT(1, "本部门"),
     ALL(2, "全部"),
     */
  SELF: "本人",
  DEPT: "本部门",
  ALL: "全部",
};

/**
 * @IPermissionTreeNode 权限树节点类型
 */
export interface IPermissionTreeNode {
  childList: IPermissionTreeNode[];
  dataScope?: any;
  dataScopeRange: string[];
  id: string;
  memo: string;
  menuCode: string;
  menuName: string;
  parentCode: string;
  permissionKey: string;
  sortNum: number;
  checked: boolean;
  [key: string]: any;
}
