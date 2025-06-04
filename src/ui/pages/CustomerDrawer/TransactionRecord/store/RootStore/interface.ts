import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITransactionRecord, ITransactionRecordProps } from "../../interface";
import { IPagination } from "@/utils/interface";
import { IEditDealModalRef } from "@/pages/CustomerDrawer/EditDealModal/interface";
import { ITransactionRecordDetailModalRef } from "@/pages/CustomerDrawer/TransactionRecordDetailModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: ITransactionRecord[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除记录 */
  deleteRecord(record: ITransactionRecord): Promise<void>;
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
  propsStore: PropsStore<ITransactionRecordProps>;
}

export interface IRefs {
  /** @param 成交弹窗 */
  dealRef: React.RefObject<IEditDealModalRef>;
  /** @param 详情弹窗 */
  detailRef: React.RefObject<ITransactionRecordDetailModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
