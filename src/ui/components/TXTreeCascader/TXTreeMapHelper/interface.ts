import { TTXTreeCascaderType } from "../interface";
import { TTXTreeCascaderNode } from "../store/RootStore/interface";

export interface ITXTreeMapHelper {
  /**@function 设置二级map */
  setTXTreeMapHelperMap: (
    primaryKey: TTXTreeCascaderType,
    secondaryKey: string,
    value: TTXTreeCascaderNode
  ) => void;
  /**@function 获取二级map */
  getTXTreeHelperMap: (
    primaryKey: TTXTreeCascaderType
  ) => Map<string, TTXTreeCascaderNode[] | undefined> | undefined;
  /**@function 获取二级map值 */
  getTXTreeHelperMapValues: (
    primaryKey: TTXTreeCascaderType,
    secondaryKey: string
  ) => TTXTreeCascaderNode | undefined;
}
