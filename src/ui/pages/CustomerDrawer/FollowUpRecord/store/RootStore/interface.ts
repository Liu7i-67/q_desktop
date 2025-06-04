import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IFollowUpRecord, IFollowUpRecordProps } from "../../interface";
import { IPagination } from "@/utils/interface";
import { IFollowUpModalRef } from "@/pages/Workbench/FollowUpModal";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IFollowUpRecord[];
  /** @param 列表分页信息 */
  pagination: IPagination;
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
  propsStore: PropsStore<IFollowUpRecordProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 跟进弹窗 */
  followUpRef: React.RefObject<IFollowUpModalRef>;
}
