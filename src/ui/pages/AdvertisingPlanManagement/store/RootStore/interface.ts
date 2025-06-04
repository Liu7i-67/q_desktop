import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IAdvertisingPlanManagement,
  IAdvertisingPlanManagementProps,
} from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { Dayjs } from "dayjs";
import { IAdvertisingPlanManagementEditModalRef } from "../../AdvertisingPlanManagementEditModal/interface";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IAdvertisingPlanManagement[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 列表项操作 */
  onAction(action: TAction, record: IAdvertisingPlanManagement): void;
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
  propsStore: PropsStore<IAdvertisingPlanManagementProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 编辑ref */
  editRef: React.RefObject<IAdvertisingPlanManagementEditModalRef>;
}

export interface ISearchInfo {
  /** @param 计划名称 */
  campaignName?: string;
  /** @paarm 所属渠道 string[] */
  channelIdList?: string[];
  /** @param 创建时间-结束 */
  createTime?: [Dayjs, Dayjs];
  /** @param 负责员工id string[] */
  userIdList?: string[];
}
