import { IResBusinessV1CustomerPeek } from "@/service/business/v1/customer/peek";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { ICustPeekModalProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IResBusinessV1CustomerPeek | string | null;
  /** @function 打开弹窗 */
  openModal(initData?: IResBusinessV1CustomerPeek): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
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
  propsStore: PropsStore<ICustPeekModalProps>;
}

export interface IRefs {}
