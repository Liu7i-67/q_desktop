import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IPastListOfConsultants,
  IPastListOfConsultantsProps,
} from "../../interface";
import { IPagination, ISegmentedOption, TAction } from "@/utils/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "getListByData"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IPastListOfConsultants[];
  /** @param 按日期查看列表数据源 */
  dataSourceByDate: IPastListOfConsultants[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @param 子tab */
  options: ISegmentedOption[];
  /** @param 选中的子tab */
  active: string;
  /** @param 日期表分页信息 */
  paginationByDate: IPagination;
  /** @function 切换子tab */
  changeActive(key: string): void;
  /** @function 搜索 */
  onSearch(info: ISearchInfo): void;
  /** @function 数据初始化 */
  init(): void;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 获取日期列表 */
  getListByData(): Promise<void>;
  /** @function 分页变动时 */
  onPageChange(pagination: IPagination): void;
  /** @function 列表项操作 */
  onAction(action: TAction, record: IPastListOfConsultants): void;
  /** @function 刷新 */
  refresh(): void;
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
  propsStore: PropsStore<IPastListOfConsultantsProps>;
  refs: IRefs;
}

export interface IRefs {}

export interface ISearchInfo {
  /** @param 咨询师 */
  userIdList?: string[];
}
