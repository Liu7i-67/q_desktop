import { IPagination } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { IManageStartgy, IManageStartgyProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "onDeleteTask"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IManageStartgy[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
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
  propsStore: PropsStore<IManageStartgyProps>;
  refs: IRefs;
}

export interface IRefs {}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
