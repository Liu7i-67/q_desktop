import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  ITransactionRecordDetailModalProps,
  IInitData,
  ITransactionRecordDetail,
} from "../../interface";
import { FormInstance, TabsProps } from "antd";

export type TLoadingStore = LoadingStore<
  "loading" | "getDetail" | "customerDealConfirm" | "cancelDealCancel"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 成交详情信息 */
  detail: ITransactionRecordDetail | null;
  /** @param tabs */
  items: TabsProps["items"];
  /** @param 当前激活的tab */
  activeKey: string;
  /** @function 修改当前激活的tab */
  changeActive(key: string): void;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取详情 */
  getDetail(): Promise<void>;
  /** @function 确认成交 */
  customerDealConfirm(): Promise<void>;
  /** @function 作废成交 */
  cancelDealCancel(): Promise<void>;
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
  propsStore: PropsStore<ITransactionRecordDetailModalProps>;
}

export interface IRefs {
  /** @param 表单ref */
  form: FormInstance<ISearchInfo>;
}

export interface ISearchInfo {
  /** @param 确认成交金额 */
  confirmAmount?: number;
  /** @param 确认备注 */
  operateMemo?: string;
  /** @param 取消备注 */
  cancelMemo?: string;
}
