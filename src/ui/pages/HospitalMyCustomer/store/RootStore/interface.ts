import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IHospitalMyCustomer, IHospitalMyCustomerProps } from "../../interface";
import { IPagination } from "@/utils/interface";
import { Dayjs } from "dayjs";
import { TDispatchStatus } from "@/service/business/v1/customer-dispatch/customer-dispatch-page";
import { IEditOrderStatusModalRef } from "@/pages/CustomerDrawer/EditOrderStatusModal/interface";
import { IInstitutionalFeedbackDrawerRef } from "@/pages/CustomerDrawer/InstitutionalFeedbackDrawer/interface";
import { IOrderDispatchMessageDrawerRef } from "@/pages/CustomerDrawer/OrderDispatchMessageModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IHospitalMyCustomer[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除单项 */
  deleteRecord(record: IHospitalMyCustomer): Promise<void>;
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
  propsStore: PropsStore<IHospitalMyCustomerProps>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 派单ref */
  dispatchRef: React.RefObject<IEditOrderStatusModalRef>;
  /** @param 机构反馈弹窗 */
  feedbackRef: React.RefObject<IInstitutionalFeedbackDrawerRef>;
  /** @param 平台留言弹窗 */
  msgRef: React.RefObject<IOrderDispatchMessageDrawerRef>;
}

export interface ISearchInfo {
  /** @param 客户电话/微信关键字 */
  keyword?: string;
  /** @param 派单时间 */
  dispatchTime?: [Dayjs, Dayjs];
  /** @param 当前状态 */
  dispatchStatusList?: TDispatchStatus[];
}
