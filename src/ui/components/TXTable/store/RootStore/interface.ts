import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITXTableProps } from "../../interface";
import { ITXColumnsSettingModalRef } from "../../TXColumnsSettingModal/interface";
import { ILocalData } from "@/utils/DataBase";
import { TTableKey } from "../../tableKey";
import { IObj } from "@/utils/interface";

export type TLoadingStore = LoadingStore<"loading" | "getLocalSetting">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 本地设置 */
  localSetting: ILocalData;
  /** @param 是否已初始化 */
  haveInit: boolean;
  /** @function 打开列表项配置弹窗 */
  openSetting(): void;
  /** @function 获取本地设置 */
  getLocalSetting(tableKey?: TTableKey): Promise<void>;
  /** @function 配置变动后 */
  afterChange(setting: ILocalData): void;
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
  refs: IRefs;
  propsStore: PropsStore<ITXTableProps<IObj>>;
}

export interface IRefs {
  /** @param 列表项配置弹窗 */
  settingRef: React.RefObject<ITXColumnsSettingModalRef>;
}
