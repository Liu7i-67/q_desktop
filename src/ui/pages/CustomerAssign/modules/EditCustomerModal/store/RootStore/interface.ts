import { IOption } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IEditCustomerModalProps, IInitData } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "onOk">;

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
  /** @function 弹窗确定按钮回调 */
  onOk: () => Promise<void>;
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
  propsStore: PropsStore<IEditCustomerModalProps>;
}

export interface IRefs {
  editForm: FormInstance<IEditForm>;
}

export interface IEditForm {
  channelId?: IOption;
  liveStreamerId?: IOption;
  platformId?: IOption;
  leadsType: string;
}
