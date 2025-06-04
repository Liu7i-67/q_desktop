import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IAdvertisingPlanManagementEditModalProps,
  IInitData,
} from "../../interface";
import { FormInstance } from "antd";

export type TLoadingStore = LoadingStore<"loading" | "onSubmit">;

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
  /** @function 保存 */
  onSubmit(): Promise<void>;
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
  propsStore: PropsStore<IAdvertisingPlanManagementEditModalProps>;
}

export interface IRefs {
  /** @param 表单 */
  form: FormInstance<ISearchInfo>;
}

export interface ISearchInfo {
  /** @param 计划名称 */
  campaignName: string;
  /** @param 负责人 */
  userId: string;
}
