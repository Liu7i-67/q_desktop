import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ICustomerFollowRecordWeb, IFollowUpTodayProps } from "../../interface";
import { Dayjs } from "dayjs";
import { IPagination, ITreeItem } from "@/utils/interface";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";
import { FormInstance } from "antd";

export type TLoadingStore = LoadingStore<
  "loading" | "getSysDept" | "getCustomerFollowPage"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 表单搜索信息 */
  formInfo: IFormInfo;
  /** @param 分页信息 */
  pagination: IPagination;
  /** @param 部门数据 */
  deptTree: ITreeItem[];
  /** @param 列表数据 */
  dataSource: ICustomerFollowRecordWeb[];
  /** @function 数据初始化 */
  init(): void;
  /** @function 获取部门数数据 */
  getSysDept(): Promise<void>;
  /** @function 获取客户跟进信息 */
  getCustomerFollowPage(): Promise<void>;
  /** @function 重置表单 */
  onReset(): void;
  /** @function 搜索 */
  onSearch(formInfo: IFormInfo): void;
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
  propsStore: PropsStore<IFollowUpTodayProps>;
}

export interface IRefs {
  /** @param 客户抽屉ref */
  customerRef: React.RefObject<ICustomerDrawerRef>;
  searchForm: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 所在部门 */
  deptIdList?: string[];
  /** @param 员工 */
  userIdList?: string[];
  /** @param 跟进时间 */
  followDate?: [Dayjs, Dayjs];
  /** @param 客户电话/微信 */
  customerKeyword?: string;
}
