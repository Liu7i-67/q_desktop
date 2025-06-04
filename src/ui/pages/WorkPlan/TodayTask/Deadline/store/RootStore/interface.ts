import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IDeadline, IDeadlineProps } from "../../interface";
import { IPagination } from "@/utils/interface";
import { RefObject } from "react";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";
import { IStatisticsCardProps } from "../../../modules/Statistics";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IDeadline[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 统计看板显隐藏*/
  showStatistics: boolean;
  /** @param 统计数据 */
  statisticsData: IStatisticsCardProps[];
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 控制统计看板显隐藏*/
  toggleStatistics: () => void;
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
  propsStore: PropsStore<IDeadlineProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 详情弹窗 */
  customerDrawerRef: RefObject<ICustomerDrawerRef>;
}
