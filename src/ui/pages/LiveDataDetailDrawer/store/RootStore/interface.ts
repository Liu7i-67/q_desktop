import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  ILiveDataDetailDrawerProps,
  IInitData,
  ILiveDataDetailRecord,
} from "../../interface";
import { IPagination } from "@/utils/interface";
import { ILiveDataDetailSecondDrawerRef } from "@/pages/reportFormsManage/LiveDataV2/modules/LiveDataDetailSecondDrawer/interface";
import { ILiveDataDealDrawerRef } from "@/pages/reportFormsManage/LiveDataV2/modules/LiveDataDealDrawer/interface";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 数据源 */
  dataSource: ILiveDataDetailRecord[];
  /** @function 打开抽屉 */
  openDrawer(initData?: IInitData): void;
  /** @function 关闭抽屉 */
  closeDrawer(): void;
  /** @function 获取列表数据源 */
  getList(): Promise<void>;
  /** @function 分页信息变动 */
  onPageChange(pagination: IPagination): void;
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
  propsStore: PropsStore<ILiveDataDetailDrawerProps>;
}

export interface IRefs {
  /** @param 客户详情Drawer */
  secondDrawerRef: React.RefObject<ILiveDataDetailSecondDrawerRef>;
  /** @param 成交详情Drawer */
  dealDrawerRef: React.RefObject<ILiveDataDealDrawerRef>;
}
