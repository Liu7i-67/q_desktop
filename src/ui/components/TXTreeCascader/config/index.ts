import { IConfig, TTXTreeCascaderType } from "../interface";
import { deptUserConfig } from "./deptUserConfig";

/** @param 配置信息 */
export const configMap = new Map<TTXTreeCascaderType, IConfig>([
  ["deptUser", deptUserConfig],
]);

/** @function 获取配置信息 */
export const getConfigMap = (type: TTXTreeCascaderType) => {
  return configMap.get(type);
};
