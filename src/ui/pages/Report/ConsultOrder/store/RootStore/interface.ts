import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IConsultOrder, IConsultOrderProps } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { Dayjs } from "dayjs";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IConsultOrder[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
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
  propsStore: PropsStore<IConsultOrderProps>;
  refs: IRefs;
}

export interface IRefs {}

export interface ISearchInfo {
  /** @param 接单时间 */
  assignTime?: [Dayjs, Dayjs];
  /** @param 咨询师 */
  idList?: string[];
}
