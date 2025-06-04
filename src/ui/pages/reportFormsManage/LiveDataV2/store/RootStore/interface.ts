import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ILiveDataV2, ILiveDataV2Props } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import dayjs from "dayjs";
import { ILiveDataDetailDrawerRef } from "@/pages/LiveDataDetailDrawer/interface";
import { ILiveDataDetailSecondDrawerRef } from "../../modules/LiveDataDetailSecondDrawer/interface";
import { ILiveDataDealDrawerRef } from "../../modules/LiveDataDealDrawer/interface";

export type TLoadingStore = LoadingStore<"loading" | "getList" | "exportData">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: ILiveDataV2[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 导出 */
  exportData(): Promise<void>;
  /** @function 列表项操作 */
  onAction(action: TAction, record: ILiveDataV2): void;
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
  propsStore: PropsStore<ILiveDataV2Props>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 详情Drawer */
  detailRef: React.RefObject<ILiveDataDetailDrawerRef>;
  /** @param 二级详情Drawer */
  secondDetailRef: React.RefObject<ILiveDataDetailSecondDrawerRef>;
  /** @param 二级成交详情Drawer */
  dealRef: React.RefObject<ILiveDataDealDrawerRef>;
}

export interface ISearchInfo {
  /** @param 筛选时间 */
  date?: [dayjs.Dayjs, dayjs.Dayjs];
  /** @param 主播id */
  liverStreamerIdList?: string[];
}
