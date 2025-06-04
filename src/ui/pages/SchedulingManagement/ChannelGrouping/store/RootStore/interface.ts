import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditChannelGroupingModalRef } from "@/pages/SchedulingManagement/EditChannelGroupingModal";
import { IChannelGrouping } from "../../interface";
import { IPagination } from "@/utils/interface";

export type TLoadingStore = LoadingStore<"loading" | "getList" | "deleteGroup">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IChannelGrouping[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /**@expandRows 记录展开行*/
  expandRows: string[];
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除分组 */
  deleteGroup(record: IChannelGrouping): Promise<void>;
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
}

export interface IRefs {
  editRef: React.RefObject<IEditChannelGroupingModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
