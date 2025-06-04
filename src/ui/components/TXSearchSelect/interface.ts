import { IOption, TRecord } from "@/utils/interface";
import { SelectProps } from "antd";

export interface ITXSearchSelectProps extends SelectProps {}

export type TRequestParams = TRecord & {
  page: number;
  size: number;
};

export interface IUseMountFetchDataProps {
  /**@param 接口Api */
  fetchDataApi: string;
  /**@param 初始化时接口额外参数 */
  request?: TRecord;
  /**@param 搜索时的key */
  searchParamKey: string;
  /**@function 转换数据源为options */
  transformOptions: (orginOption: TRecord[]) => IOption[];
  /**@param 满足某种条件时加载数据，使用时请将 initFetch 设置为 false  */
  refreshFetch?: boolean;
  /**@param 是否挂载时默认加载数据 */
  initFetch?: boolean;
}

export interface IUseMountFetchDataResult {
  /** @param 下拉框选项 */
  options: IOption[];
  /** @function 下拉框搜索 */
  onSearch: (value: string) => void;
}
