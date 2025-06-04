import { TRecord } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { TreeDataNode } from "antd";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "getTreeData">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /**@param 数据源 */
  originTree: TRecord[];
  /**@param 转换后树 */
  treeData: TreeDataNode[];
  /**@param 展开项 */
  expandKeys: React.Key[];
  /**@function 搜索树节点 */
  handleSearch: (value: string) => void;
  /**@function 过滤树节点并设置展开项 */
  getFilteredNodesAndExpandedKeys: (
    searchValue: string
  ) => [TRecord[], React.Key[]];
  /**@function 转化数据源为树结构 */
  transformTree: (tree?: TRecord[]) => void;
  /**@function 设置展开树节点 */
  setExpandedKeys: (key: React.Key[]) => void;
  /**@function 过滤树节点的条件 */
  matchSearch: (node: TRecord, searchValue: string) => boolean;
  /**@function 删除树节点 */
  deleteTreeNode: (node: TreeDataNode) => Promise<void>;
  /**@function 获取树 */
  getTreeData: () => Promise<void>;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<ITXTreeSidebarProps>;
  refs: IRefs;
}

export interface IRefs {}

export interface ITypeObj {
  org: any;
  channel: any;
  mainData: any;
  dept: any;
}

export interface ITXTreeSidebarProps {
  /**@type 类型 */
  type: TTXTreeSidebarType;
  /**@param 新增权限 */
  createPermission: boolean;
  /**@param 更新权限 */
  updatePermission: boolean;
  /**@param 删除权限 */
  deletePermission?: boolean;
  /**@function 新增节点 */
  onCreate: (param: IActionParam) => void;
  /**@function 编辑节点 */
  onUpdate: (param: IActionParam) => void;
  /**@function 选择节点后回调 */
  onSelect: (key: React.Key[]) => void;
}

export interface IITXTreeSidebarRef {
  /**@function 请求获取树 */
  getTreeData: () => Promise<void>;
  /**@function 暴露数据源供外部组件使用*/
  exportTreeData: () => TNode[];
}

/**
 * org：机构管理
 * channel：渠道管理
 * mainData：医美项目管理
 * dept：部门管理
 */
export type TTXTreeSidebarType = "org" | "channel" | "mainData" | "dept";

export type TNode = {
  data: TRecord;
} & TreeDataNode;

export interface IActionParam {
  tree: TreeDataNode[];
  node?: TNode;
  isCreate: boolean;
}
