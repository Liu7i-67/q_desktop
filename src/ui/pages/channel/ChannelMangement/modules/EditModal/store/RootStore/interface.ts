import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IEditModalProps, IInitData } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "getChannelDetail" | "onCreateChannel" | "onEditChannel"
>;

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
  /** @function 获取渠道详情 */
  getChannelDetail: () => Promise<void>;
  /** @function 初始化新增渠道弹窗部分内容 */
  initCreateModalForm: () => void;
  /** @function 新增渠道 */
  onCreateChannel: () => Promise<any>;
  /** @function 编辑渠道 */
  onEditChannel: () => Promise<any>;
  /** @function 获取表单数据*/
  getFormData: () => Promise<any>;
  /** @function 弹窗确认按钮回调 */
  onOk: () => void;
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
  editForm: FormInstance<any>;
}
