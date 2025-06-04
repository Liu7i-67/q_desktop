import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITXSearchFormProps } from "../../interface";
import { FormInstance } from "antd";
import { ITXFormItemSettingModalRef } from "../../TXFormItemSettingModal/interface";
import { ILocalFormData } from "@/utils/DataBase";
import { TFormKey } from "../../formKey";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 是否展开 */
  expand: boolean;
  /** @param 是否需要渲染折叠按钮 */
  renderExpand: boolean;
  /** @param 本地设置 */
  localSetting: ILocalFormData;
  /** @function 配置变动后 */
  afterChange(setting: ILocalFormData): void;
  /** @function 行高改变时 */
  changeHeight(num: number): void;
  /** @function 打开列表项配置弹窗 */
  openSetting(): void;
  /** @function 获取本地设置 */
  getLocalSetting(formKey?: TFormKey): Promise<void>;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<ITXSearchFormProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 内容ref */
  contentRef: React.RefObject<HTMLDivElement>;
  /** @param 表单内容ref */
  formBodyRef: React.RefObject<HTMLDivElement>;
  /** @param 操作栏refs */
  barRef: React.RefObject<HTMLDivElement>;
  /** @param 内置form */
  form: FormInstance<any>;
  /** @param 列表项配置弹窗 */
  settingRef: React.RefObject<ITXFormItemSettingModalRef>;
}
