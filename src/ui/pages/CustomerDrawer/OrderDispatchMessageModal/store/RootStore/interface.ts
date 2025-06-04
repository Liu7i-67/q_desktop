import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IOrderDispatchMessageModalProps,
  IInitData,
  IOrderDispatchMessage,
} from "../../interface";
import { IPagination } from "@/utils/interface";
import { FormInstance } from "antd";

export type TLoadingStore = LoadingStore<
  "loading" | "getDispatchMessages" | "submit"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 分页信息 */
  pagination: IPagination;
  /** @param 数据源 */
  dataSource: IOrderDispatchMessage[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取留言数据 */
  getDispatchMessages(): Promise<void>;
  /** @function 提交留言 */
  submit(): Promise<void>;
  /** @function 下一页 */
  nextPage(): void;
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
  propsStore: PropsStore<IOrderDispatchMessageModalProps>;
}

export interface IRefs {
  form: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 留言信息 */
  message: string;
}
