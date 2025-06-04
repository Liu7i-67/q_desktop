import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IOrganizationRecord, IOrganizationRecordProps } from "../../interface";
import { IPagination } from "@/utils/interface";
import { IEditOrganizationRecordModalRef } from "@/pages/CustomerDrawer/EditOrganizationRecordModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IOrganizationRecord[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除单项 */
  deleteRecord(record: IOrganizationRecord): Promise<void>;
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
  propsStore: PropsStore<IOrganizationRecordProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 编辑弹窗 */
  editRef: React.RefObject<IEditOrganizationRecordModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
