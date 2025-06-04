import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IRepeatModalProps, IInitData } from "../../interface";
import { IRepeatResult } from "@/pages/customerManage/MyCustomerV2/interface";
import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";
import { RefObject } from "react";

export type TLoadingStore = LoadingStore<"loading" | "repeat">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 微信/电话查重结果 */
  repeatResult: IRepeatResult | null;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 查重 */
  repeat(keyword: string): Promise<void>;
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
  propsStore: PropsStore<IRepeatModalProps>;
}

export interface IRefs {
  /** @param 协作弹窗ref */
  collRef: RefObject<ICollaborationModalRef>;
}
