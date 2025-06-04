import { TTableKey } from "../tableKey";
import { ITXColumnType } from "../interface";
import { ILocalData } from "@/utils/DataBase";
import { SizeType } from "antd/es/config-provider/SizeContext";

export interface ITXColumnsSettingModalProps {
  /** @function 保存之后 */
  afterSave?: (setting: ILocalData) => void;
}

export interface ITXColumnsSettingModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 表格配置项的唯一标识符 没有时不显示配置操作 */
  tableKey: TTableKey;
  /** @param 列表配置项 */
  columns: ITXColumnType[];
  /** @param 表格大小 */
  tableSize: SizeType;
  /** @param 是否固定y轴高度 */
  fixedY?: boolean;
  columnSpan?: number;
}
