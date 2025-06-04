import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditDealModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { ITreeItem } from "@/utils/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "submit" | "getProjectTreeData" | "getOrgTreeData"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 项目树 */
  pojectTree: ITreeItem[];
  /** @param 机构树 */
  orgTree: ITreeItem[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 提交表单 */
  submit(): Promise<void>;
  /** @function 获取项目树 */
  getProjectTreeData(): Promise<void>;
  /** @function 获取机构树 */
  getOrgTreeData(): Promise<void>;
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
  propsStore: PropsStore<IEditDealModalProps>;
}

export interface IRefs {
  form: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 是否补录 */
  historyFlag?: boolean;
  /** @param 上报时间 */
  createTime?: Dayjs;
  /** @param 成交时间 */
  dealDate: Dayjs;
  /** @param 成交项目 */
  itemPostDTOList?: IItemDTO[];
  /** @param 成交机构 */
  orgId: string;
  /** @param 成交总金额 */
  amount?: number;
  /** @param 成交备注 */
  memo?: string;
}

export interface IItemDTO {
  /** @param 项目 */
  dataId: string;
  /** @param 金额 */
  amount: number;
}
