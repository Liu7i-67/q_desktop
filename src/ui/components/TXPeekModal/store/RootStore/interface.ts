import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";
import { IResBusinessV1CustomerPeek } from "@/service/business/v1/customer/peek";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { IInitData, ITXPeekModalProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "repeat">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 查重数据 */
  repeatData: IResBusinessV1CustomerPeek | null;
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
  propsStore: PropsStore<ITXPeekModalProps>;
}

export interface IRefs {
  collaborationModalRef: React.RefObject<ICollaborationModalRef>;
}
