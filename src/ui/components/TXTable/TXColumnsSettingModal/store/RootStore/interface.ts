import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITXColumnsSettingModalProps, IInitData } from "../../interface";
import { ITXColumnType } from "@/components/TXTable/interface";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { DragEndEvent } from "@dnd-kit/core";

export type TLoadingStore = LoadingStore<"loading" | "onSubmit">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 正常展示的字段 */
  renderList: string[];
  /** @param 固定在左侧的字段 */
  leftList: string[];
  /** @param 固定在右侧的字段 */
  rightList: string[];
  /** @param 列配置项 */
  columnMap: Map<string, ITXColumnType>;
  /** @param 表格大小 */
  tableSize: SizeType;
  /** @function 修改表格大小 */
  changeTableSize(val: SizeType): void;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 修改字段可见状态 */
  changeHidden(key: string): void;
  /** @function 全选或全部取消 */
  multipleChoices(checked: boolean): void;
  /** @function 取消固定 */
  cancelFixed(key: string): void;
  /** @function 固定在左侧 */
  fixedToLeft(key: string): void;
  /** @function 固定在右侧 */
  fixedToRight(key: string): void;
  /** @function 数据初始化 */
  toInit(isReset?: boolean): void;
  /** @function 排序 */
  onDragEnd(event: DragEndEvent): void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  /** @param 是否有选中 */
  indeterminate: boolean;
  /** @param 是否全选 */
  checkedAll: boolean;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITXColumnsSettingModalProps>;
}

export interface IRefs {}

export interface ITepItem {
  key: string;
  index: number;
}
