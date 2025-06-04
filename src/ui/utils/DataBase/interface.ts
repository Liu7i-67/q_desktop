import { ITXColumnType } from "@/components/TXTable/interface";
import { TTableKey } from "@/components/TXTable/tableKey";
import { TFormKey } from "@/components/TXSearchForm/formKey";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { IBaseFormItem } from "@/components/TXSearchForm/TXFormItemSettingModal/interface";
export type TTableData = Record<TTableKey, ILocalData>;

export type TFormData = Record<TFormKey, ILocalFormData>;

export type TLocalColumn = Pick<ITXColumnType, "fixed" | "hidden"> & {
  index: number;
};

export interface ILocalFormColumn {
  index: number;
  hidden: boolean;
}

export interface ITableSetting {
  [key: string]: TLocalColumn;
}
export interface IFormSetting {
  [key: string]: ILocalFormColumn;
}

export interface ILocalData {
  /** @param 列表项配置 */
  columns: ITableSetting;
  /** @param 表格大小 */
  tableSize: SizeType;
  /** @param 是否固定y轴高度 true-是 */
  fixedY?: boolean;
}

export interface ILocalFormData {
  /** @param 搜索项配置 */
  columns: IFormSetting;
}
