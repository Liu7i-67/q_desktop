import { TRecord } from "@/utils/interface";
import { ReactNode } from "react";
import { IInitData, TTXTreeCascaderNode } from "./store/RootStore/interface";

export interface ITXTreeCascaderProps {
  /** @param 组件类型 */
  type: TTXTreeCascaderType;
  /** @function 关闭之后 */
  afterClose?: (checkedNodes: TTXTreeCascaderNode[]) => void;
  /** @function 处理后的树节点自定义额外的key */
  onCustomExtraNodeKey?: (node: TRecord) => object;
}

export interface ITXTreeCascaderRef {
  /** @function 打开弹窗 */
  openModal: (initData?: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

/**
 * @param channel 来源渠道
 */
export type TTXTreeCascaderType = "deptUser";

export interface IConfig {
  /**@param 弹窗标题 */
  title: ReactNode;
  /**@param tree接口api */
  fetchApi: string;
  /**@param tree接口初始参数 */
  request: TRecord;
  /**@param 左侧输入框placeholder */
  placeholder: string;
  /**@param 右侧选择title */
  selectedTitle: string;
  /**@param 树节点配置信息*/
  nodeConfig: INodeConfig[];
}

export interface INodeConfig {
  /**@param 树节点的children字段名 */
  childrenKey: string;
  /**@param 树结点的title字段名 */
  searchFilterKey: string;
  /**@param 树节点key字段名*/
  key: string;
  /**@param 树节点paretnKey字段名 */
  parentKey: string;
}

export interface IOnCustomCheckedNodesResult {
  checkedNodes: TTXTreeCascaderNode[];
  checkedKeys: string[];
}
