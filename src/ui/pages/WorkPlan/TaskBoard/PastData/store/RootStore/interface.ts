import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPastDataProps, ITotalInfo } from "../../interface";
import { ISegmentedOption } from "@/utils/interface";
import { Dayjs } from "dayjs";

export type TLoadingStore = LoadingStore<"loading" | "getTotal">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 二级tab */
  options: ISegmentedOption[];
  /** @param 展示的二级tab */
  active: string;
  /** @param 渲染的二级tab */
  renderSet: Set<string>;
  /** @param 子表格的高度 */
  childHeight: string;
  /** @param 策略id */
  taskId: string;
  /** @param 统计信息 */
  totalInfo: ITotalInfo | null;
  /** @param 结束时间 */
  endDate: [Dayjs, Dayjs];
  /** @function 修改任务策略 */
  changeTaskId(val: string): void;
  /** @function 面板折叠后 */
  onFold(fold: boolean): void;
  /** @function 初始化 */
  init(): void;
  /** @function 获取统计信息 */
  getTotal(): Promise<void>;
  /** @function 切换tab */
  changeActive(val: string): void;
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
  propsStore: PropsStore<IPastDataProps>;
}

export interface IRefs {}
