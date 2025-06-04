import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPersonalCenterDrawerRef } from "@/pages/PersonalCenterDrawer/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getCustomerDetail" | "getHospitalData"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 是否接受服务端信息 */
  listenFlag: boolean;
  /** @param 请求定时器 */
  timer: NodeJS.Timeout | null;
  /** @function 初始化 */
  init(): void;
  /** @function 切换消息开关 */
  changeListenFlag(): void;
  /** @function 获取医院数据 */
  getHospitalData(): Promise<void>;
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
}

export interface IRefs {
  /** @param 用户中心抽屉 */
  userRef: React.RefObject<IPersonalCenterDrawerRef>;
}
