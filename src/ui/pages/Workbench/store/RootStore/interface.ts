import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITabItem } from "@/utils/interface";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 可见的tab项 */
  items: ITabItem[];
  /** @param 当前激活项 */
  activeKey: string;
  /** @param 已渲染的页面 */
  renderSet: Set<string>;
  /** @function 初始化可见tab项 */
  init(): void;
  /** @function 切换tab项 */
  onChange(key: string): void;
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
}

export interface IRefs {}
