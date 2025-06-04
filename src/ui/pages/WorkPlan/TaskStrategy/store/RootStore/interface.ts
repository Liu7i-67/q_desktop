import { ITabItem } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { ITaskStrategyProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /**@param tab items */
  items: ITabItem[];
  /**@param tab选中项，值为EXECUTOR、CARETAKER、NONE*/
  activeKey: string;
  /**@param 是否显示新增、编辑策略信息组件 */
  strategyVisible: boolean;
  /**@function 初始化页面 */
  init: () => void;
  /**@function tabs改变回调*/
  onChange: (activeKey: string) => void;
  /**@function 设置新增、编辑策略信息组件显示隐藏 */
  onStrategyVisibleChange: (visible: boolean) => void;
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
  propsStore: PropsStore<ITaskStrategyProps>;
  refs: IRefs;
}

export interface IRefs {}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
