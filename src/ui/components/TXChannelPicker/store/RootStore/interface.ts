import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITXChannelPickerProps } from "../../interface";
import { ITreeItem } from "@/utils/interface";
import { ITXEmployeePickerModalRef } from "@/components/TXEmployeePicker/Modal";

export type TLoadingStore = LoadingStore<
  "loading" | "getData" | "getChannelByUser"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 渠道信息 */
  treeData: ITreeItem[];
  /** @function 获取渠道信息 */
  getData(): Promise<void>;
  /** @function 根据人员获取渠道信息 */
  getChannelByUser(ids: string[]): Promise<void>;
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
  propsStore: PropsStore<ITXChannelPickerProps>;
}

export interface IRefs {
  /** @param 用户选择弹窗 */
  userRef: React.RefObject<ITXEmployeePickerModalRef>;
}
