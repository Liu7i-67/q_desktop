import { TFormData, TTableData } from "./interface";

export interface ILocalBaseInfo {
  /** @param 表格配置 */
  TABLE: Partial<TTableData>;
  /** @param 搜索项配置 */
  SEARCH: Partial<TFormData>;
}

export type TDataBase =
  // 表格设置
  | "TABLE"
  // 搜索项设置
  | "SEARCH";
