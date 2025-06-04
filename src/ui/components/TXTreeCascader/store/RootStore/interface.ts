import { TRecord } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { TreeDataNode, TreeProps } from "antd";
import { Key } from "react";
import { ITXTreeCascaderProps, TTXTreeCascaderType } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"getTreeData">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param tree数据源 */
  originTreeData: TRecord[];
  /** @param 转换后的数据源，后续操作需要重置时，赋值该树 */
  originTransformTreeData: TTXTreeCascaderNode[];
  /** @param 用于展示的tree */
  treeData: TTXTreeCascaderNode[];
  /** @param 选择的树节点key */
  checkedKeys: string[];
  /** @param 选择的树节点 */
  checkedNodes: TTXTreeCascaderNode[];
  /** @param 展开项 */
  expandKeys: string[];
  /** @param 打开弹窗时初始化展开项 */
  initExpandKeys: string[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): Promise<void>;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取tree数据 */
  getTreeData: () => Promise<void>;
  /** @function 搜索 */
  onSearch: (value: string) => void;
  /** @function 复选框选择树节点 */
  onCheck: TreeProps["onCheck"];
  /** @function 展开/收起节点回调 */
  onExpand: TreeProps["onExpand"];
  /** @function 初始化选中项状态 */
  initTreeCheckedStatus: () => void;
  /** @function 初始化展开状态 */
  initExpandStatus: () => void;
  /** @function 弹窗确定按钮回调 */
  onOk: () => void;
  /** @function 移除选择的节点 */
  onRemoveSelectedNode: (key: string, node: TTXTreeCascaderNode) => void;
  /** @function 根据选中的节点，计算需要展开的节点路径 */
  generateExpandKeysWithCheckedNodes: (type: TTXTreeCascaderType) => string[];
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
  refs: IRefs;
  propsStore: PropsStore<ITXTreeCascaderProps>;
}

export interface IRefs {}

export interface IInitData {
  /**@param 选中的树节点 */
  checkedNodes: TTXTreeCascaderNode[];
}

export interface ICheckedProps {
  checked: Key[];
  halfChecked: Key[];
}

export interface ITXTreeDefaultCascaderNode extends TreeDataNode {
  /**@param 节点的源数据 */
  data?: TRecord;
  /**@param 是否高亮 */
  highLight?: boolean;
  /**@param 父节点id */
  parentId?: string;
  /**@param 层级 */
  level?: number;
  /**@param 其余自定义字段*/
  [key: string]: any;
}

export type TTXTreeCascaderNode = ITXTreeDefaultCascaderNode;
