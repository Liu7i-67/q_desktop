import { IReqBaseV1SysDictValueSave } from "@/service/base/v1/sys-dict-value/save";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import {
  IAddOrEditDictionaryValueModalProps,
  IInitData,
} from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "onSave" | "onUpdate">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData;
  /** @function 打开弹窗 */
  openModal(initData: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /**@function 弹窗确认按钮回调 */
  onOk: () => void;
  /**@function 新增字典值 */
  onSave: () => Promise<void>;
  /**@function 编辑字典值 */
  onUpdate: () => Promise<void>;
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
  propsStore: PropsStore<IAddOrEditDictionaryValueModalProps>;
}

export interface IRefs {
  form: FormInstance<Required<IReqBaseV1SysDictValueSave>>;
}
