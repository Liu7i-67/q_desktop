import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IMergeCustomerModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";

export type TLoadingStore = LoadingStore<
  "loading" | "onMergeCustomerSearch" | "handleConfirmMergeCustomer"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 客户合并列表 */
  mergeCustomerTableData: IResBusinessV1CustomerGetPage[];
  /** @param 选中要合并id */
  mergeCustomerSelectedRowKeys: string[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 搜索获取合并列表 */
  onMergeCustomerSearch(): Promise<void>;
  /** @function 选择要合并的客户 */
  handleMergeCustomerSelectChange(selectedRowKeys: string[]): void;
  /** @function 提交合并 */
  handleConfirmMergeCustomer(): Promise<void>;
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
  propsStore: PropsStore<IMergeCustomerModalProps>;
}

export interface IRefs {
  /** @param 合并搜索 */
  mergeSearchForm: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 客户电话 */
  phoneNumber: string;
  /** @param 客户微信 */
  wechatNumber: string;
}
