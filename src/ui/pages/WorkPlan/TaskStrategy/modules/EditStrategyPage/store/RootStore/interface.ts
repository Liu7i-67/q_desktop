import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { IEditStrategyPageProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /**@param 步骤条进度 */
  stepCurrent: number;
  /**@function 步骤条进度改变 */
  onSetStepCurrent: (step: number) => void;
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
  propsStore: PropsStore<IEditStrategyPageProps>;
}

export interface IRefs {}
