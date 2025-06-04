import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditDispatchRecordModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";
import { ITreeItem } from "@/utils/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getAvailableOrg" | "getProjectTree" | "submit"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 机构信息 */
  orgTree: ITreeItem[];
  /** @param 项目信息 */
  pojectTree: ITreeItem[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取用户可派单的机构 */
  getAvailableOrg(): Promise<void>;
  /** @function 获取项目数据 */
  getProjectTree(): Promise<void>;
  /** @function 派单 */
  submit(): Promise<void>;
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
  propsStore: PropsStore<IEditDispatchRecordModalProps>;
}

export interface IRefs {
  /** @param 表单 */
  form: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 派单电话 */
  phoneNumber: string;
  /** @param 派单机构 */
  orgIdList: string[];
  /** @param 派单项目 */
  itemPostDTOList: string[];
  /** @param 派单备注 */
  memo: string;
}
