import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IHistoricalDispatchingModalProps,
  IHistoricalDispatchingRecord,
  IInitData,
} from "../../interface";
import { IPagination } from "@/utils/interface";

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
  dataSource: IHistoricalDispatchingRecord[];
  /** @param 分页 */
  pagination: IPagination;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取历史派单数据源 */
  getList(): Promise<void>;
  /** @function 分页数据变动 */
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
  propsStore: PropsStore<IHistoricalDispatchingModalProps>;
}

export interface IRefs {}
