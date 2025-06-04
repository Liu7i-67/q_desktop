import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IOrderDispatchRecord,
  IOrderDispatchRecordProps,
} from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { IHistoricalDispatchingModalRef } from "@/pages/HistoricalDispatchingModal/interface";
import { IEditDispatchRecordModalRef } from "@/pages/CustomerDrawer/EditDispatchRecordModal/interface";
import { IOrderDispatchMessageModalRef } from "@/pages/CustomerDrawer/OrderDispatchMessageModal/interface";
import { IEditOrderStatusModalRef } from "@/pages/CustomerDrawer/EditOrderStatusModal/interface";
import { IInstitutionalFeedbackDrawerRef } from "@/pages/CustomerDrawer/InstitutionalFeedbackDrawer/interface";
import { IEditDealModalRef } from "@/pages/CustomerDrawer/EditDealModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getCustomerDispatchPage" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 数据源 */
  dataSource: IOrderDispatchRecord[];
  /** @param 分页信息 */
  pagination: IPagination;
  /** @function 获取客户派单记录 */
  getCustomerDispatchPage: () => Promise<void>;
  /** @function 删除派单记录 */
  deleteRecord: (record: IOrderDispatchRecord) => Promise<void>;
  /** @function 重置页面数据 */
  resetPageData: () => void;
  /** @function 分页信息变动 */
  onPageChange(pagination: IPagination): void;
  /** @function 列表项操作 */
  recordAction(record: IOrderDispatchRecord, action: TAction): void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  /** @param 是否为无效客户 */
  isInvalid: boolean;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IOrderDispatchRecordProps>;
}

export interface IRefs {
  /** @param 历史派单弹窗 */
  historyRecordRef: React.RefObject<IHistoricalDispatchingModalRef>;
  /** @param 编辑弹窗 */
  editRef: React.RefObject<IEditDispatchRecordModalRef>;
  /** @param 留言弹窗 */
  msgRef: React.RefObject<IOrderDispatchMessageModalRef>;
  /** @param 修改状态弹窗 */
  statusRef: React.RefObject<IEditOrderStatusModalRef>;
  /** @param 机构反馈弹窗 */
  feedbackRef: React.RefObject<IInstitutionalFeedbackDrawerRef>;
  /** @param 成交弹窗 */
  dealRef: React.RefObject<IEditDealModalRef>;
}
