import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  ILiveDataDetailSecondDrawerProps,
  IInitData,
  ILiveDataDetailSecondRecord,
} from "../../interface";
import { IPagination } from "@/utils/interface";

export type TLoadingStore = LoadingStore<"getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 数据源 */
  dataSource: ILiveDataDetailSecondRecord[];
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
  propsStore: PropsStore<ILiveDataDetailSecondDrawerProps>;
}

export interface IRefs {}
