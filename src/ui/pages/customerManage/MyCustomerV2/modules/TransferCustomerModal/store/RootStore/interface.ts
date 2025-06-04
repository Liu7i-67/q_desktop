import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITransferCustomerModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";

export type TLoadingStore = LoadingStore<
  "loading" | "handleConfirmTransferCustomer"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 提交转移客户 */
  handleConfirmTransferCustomer(): Promise<void>;
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
  propsStore: PropsStore<ITransferCustomerModalProps>;
}

export interface IRefs {
  transferForm: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 咨询师Id*/
  transferUserId: string;
}
