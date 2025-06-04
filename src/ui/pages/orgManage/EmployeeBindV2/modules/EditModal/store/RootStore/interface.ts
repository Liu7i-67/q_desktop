import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";

export type TLoadingStore = LoadingStore<"loading" | "submitForm">;

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
  /** @function 获取员工机构关系 */
  getUserOrgDetail(): Promise<void>;
  /** @function 提交表单 */
  submitForm(): Promise<void>;
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
  propsStore: PropsStore<IEditModalProps>;
}

export interface IRefs {
  /** @param 新增/编辑Form */
  editForm: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 员工id */
  userId: string;
  /** @param 机构id */
  orgId: {
    value: string;
    label: string;
  }[];
}
