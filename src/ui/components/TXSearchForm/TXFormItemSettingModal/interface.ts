import { ILocalData, ILocalFormColumn, ILocalFormData } from "@/utils/DataBase";
import { TFormKey } from "../formKey";
import { ReactNode } from "react";

export interface ITXFormItemSettingModalProps {
  /** @function 保存之后 */
  afterSave?: (setting: ILocalFormData) => void;
}

export interface ITXFormItemSettingModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /** @param 表格配置项的唯一标识符 没有时不显示配置操作 */
  formKey: TFormKey;
  /** @param 列表配置项 */
  columns: IBaseFormItem[];
  columnSpan?: number;
}

export interface IBaseFormItem {
  name: string;
  label: ReactNode;
}

export interface IEditBaseFormItem extends ILocalFormColumn {}
export interface IEditBaseFormItem extends IBaseFormItem {}
