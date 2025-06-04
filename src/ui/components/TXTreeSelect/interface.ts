import { TRecord } from "@/utils/interface";
import { TreeDataNode, TreeSelectProps } from "antd";

export interface ITXTreeSelectProps extends TreeSelectProps {}

export interface IUseTXTreeSelectFetchProps {
  /**@param 接口Api */
  fetchDataApi: string;
  /**@param 初始化时接口额外参数 */
  request?: TRecord;
  /**@function 转换数据源为options */
  transformTree: (originTree: TRecord[]) => TreeDataNode[];
  /**@param 满足某种条件时加载数据，使用时请将 initFetch 设置为 false  */
  refreshFetch?: boolean;
  /**@param 是否挂载时默认加载数据 */
  initFetch?: boolean;
}

export interface IUseTXTreeSelectFetchResult extends Partial<TreeSelectProps> {
  /** @param 下拉框选项 */
  treeData: TreeDataNode[];
}
