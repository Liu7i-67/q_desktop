import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IVisitRecord, IVisitRecordProps } from "../../interface";
import { IPagination } from "@/utils/interface";
import { IEditVisitRecordModalRef } from "@/pages/CustomerDrawer/EditVisitRecordModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IVisitRecord[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除单项 */
  deleteRecord(record: IVisitRecord): Promise<void>;
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
  propsStore: PropsStore<IVisitRecordProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 编辑弹窗ref */
  editRef: React.RefObject<IEditVisitRecordModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
