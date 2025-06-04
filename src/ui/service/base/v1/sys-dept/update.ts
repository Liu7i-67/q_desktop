export interface IReqBaseV1SysDeptUpdate {
  /** @param 部门名称 */
  deptName: string;
  /** @param 主键id */
  id: string;
  /** @param 上级部门id */
  parentId: string;
}

export type TReqBaseV1SysDeptUpdate = boolean;
