import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import {
  IScheduleArrangementDrawerProps,
  IInitData,
  IWeekViewRecord,
  IWorkingShift,
} from "../../interface";
import { IUserPickerDrawerRef } from "../../UserPickerDrawer/interface";
import { ITreeItem } from "@/utils/interface";
import { ISchedulePickerDrawerRef } from "../../SchedulePickerDrawer/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getWeekData" | "getWorkingShiftList" | "saveView"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 当前的时间区间 */
  rangeDate: string[];
  /** @param 排班数据 key为用户id+日期 */
  scheduleMap: Map<string, IWeekViewRecord>;
  /** @param 表格数据源 */
  dataSource: IScheduleRecord[];
  /** @param 班次信息 */
  workingShift: IWorkingShift[];
  /** @param 当前编辑的列 */
  record: IEditScheduleRecord | null;
  /** @function 打开抽屉 */
  openDrawer(initData?: IInitData): void;
  /** @function 关闭抽屉 */
  closeDrawer(): void;
  /** @function 获取周排班数据 */
  getWeekData(): Promise<void>;
  /** @function 获取班次信息 */
  getWorkingShiftList(): Promise<void>;
  /** @function 新增行 */
  addRecordRow(): void;
  /** @function 表格的操作 */
  optionAction(record: IScheduleRecord, action: TAction, date?: string): void;
  /** @function 选择用户 */
  onUserSelect(record: ITreeItem): void;
  /** @function 修改班次 */
  saveView(): Promise<void>;
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
  propsStore: PropsStore<IScheduleArrangementDrawerProps>;
}

export interface IRefs {
  /** @param 用户选择抽屉 */
  userRef: React.RefObject<IUserPickerDrawerRef>;
  /** @param 班次选择抽屉 */
  scheduleRef: React.RefObject<ISchedulePickerDrawerRef>;
}

export interface IScheduleRecord {
  /** @param 用户id */
  userId: string;
  /** @param 用户名称 */
  userName: string;
  [key: string]: string | undefined;
}

export interface IEditScheduleRecord extends IScheduleRecord {
  /** @param 选择器选择的日期 */
  date?: string;
}

/** @type user-选择员工 delete-删除排班 picker-选择班次 */
export type TAction = "user" | "delete" | "picker";
