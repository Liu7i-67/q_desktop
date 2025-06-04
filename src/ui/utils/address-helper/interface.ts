import { IResBaseV1RegionTree } from "@/service/base/v1/region/tree";
import { TreeDataNode } from "antd";

export interface IAddressHelper {
  /** @param 原始数据 */
  treeData: IResBaseV1RegionTree[];
  /** @param 区域映射关系 */
  areaMap: Map<string, IBaseV1RegionTreeRecord>;
  /** @param 是否正在请求数据 */
  loading: boolean;
  /** @function 获取数据源 */
  getRegionTree(): Promise<void>;
  /** @function 获取区域名称 */
  getAreaLabel(areaCode: string): string;
  /** @function 获取区域名称路径 */
  getAreaNamePath(areaCode: string): string[];
  /** @function 根据level过滤树，并否返回转化后的树或者源树*/
  getTreeDataWithLevel(
    isTransform: boolean,
    level?: number
  ): Promise<IResBaseV1RegionTree[] | TreeDataNode[]>;
}

export interface IBaseV1RegionTreeRecord {
  origin: IResBaseV1RegionTree;
  /** @param 区域名称路径 */
  areaNamePath: string[];
}
