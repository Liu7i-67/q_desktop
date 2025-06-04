import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditPasswordModalProps, IInitData } from "../../interface";
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
  propsStore: PropsStore<IEditPasswordModalProps>;
}

export interface IRefs {
  /** @param 表单 */
  form: FormInstance<ISearchInfo>;
}

export interface ISearchInfo {
  /** @param 旧密码 */
  oldPassword: string;
  /** @param 新密码 */
  newPassword: string;
  /** @param 确认密码 */
  confirmPassword: string;
}
