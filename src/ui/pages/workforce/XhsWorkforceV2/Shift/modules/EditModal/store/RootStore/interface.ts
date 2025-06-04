import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from ".";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";
import dayjs from "dayjs";

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
  /** @function 提交表单 */
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
  propsStore: PropsStore<IEditModalProps>;
}

export interface IRefs {
  editForm: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 班次名称 */
  shiftName: string;
  /** @param 排班类型 */
  scheduleType: string;
  /** @param 排班时间段 */
  timeSlot: [dayjs.Dayjs, dayjs.Dayjs];
  /** @param 配色 */
  frontendExtension: string;
}
