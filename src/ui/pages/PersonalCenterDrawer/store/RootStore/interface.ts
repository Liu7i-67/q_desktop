import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPersonalCenterDrawerProps, IInitData } from "../../interface";
import { IEditNicknameModalRef } from "../../EditNicknameModal/interface";
import { IEditPasswordModalRef } from "../../EditPasswordModal/interface";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @function 打开抽屉 */
  openDrawer(initData?: IInitData): void;
  /** @function 关闭抽屉 */
  closeDrawer(): void;
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
  propsStore: PropsStore<IPersonalCenterDrawerProps>;
}

export interface IRefs {
  /** @param 编辑别名弹窗 */
  nickRef: React.RefObject<IEditNicknameModalRef>;
  /** @param 编辑密码弹窗 */
  passwordRef: React.RefObject<IEditPasswordModalRef>;
}
