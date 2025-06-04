import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditVisitRecordModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { ITreeItem } from "@/utils/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getProjectTreeData" | "getOrgTreeData"
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
  /** @function 获取项目数据源 */
  getProjectTreeData(): Promise<void>;
  /** @function 获取机构数据源 */
  getOrgTreeData(): Promise<void>;
  /** @function 提交表单 */
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
  propsStore: PropsStore<IEditVisitRecordModalProps>;
}

export interface IRefs {
  /** @param 表单ref */
  form: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 到院时间 */
  arrivalTime: Dayjs;
  /** @param 到院项目 */
  itemDTOList: string[];
  /** @param 到院机构 */
  orgId: string;
}
