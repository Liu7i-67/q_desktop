import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IAddOrEditTypeModalProps, IInitData } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "onSave" | "onEdit">;

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
  /** @function 初始化新增弹窗 */
  initFormByCreate: () => void;
  /** @function 初始化编辑弹窗 */
  initFormByEdit: () => void;
  /** @function 弹窗确认回调 */
  onOk: () => void;
  /** @function 新增分类 */
  onSave: () => Promise<any>;
  /** @function 编辑分类 */
  onEdit: () => Promise<any>;
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
  propsStore: PropsStore<IAddOrEditTypeModalProps>;
}

export interface IRefs {
  form: FormInstance<IForm>;
}

export interface IForm {
  /**@param 上级分类 */
  parentId?: string;
  /**@param 分类名称 */
  typeName: string;
  /**@param 备注 */
  memo?: string;
}
