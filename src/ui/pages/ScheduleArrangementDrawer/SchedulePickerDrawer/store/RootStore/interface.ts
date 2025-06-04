import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ISchedulePickerDrawerProps, IInitData } from "../../interface";
import { IWorkingShift } from "@/pages/ScheduleArrangementDrawer/interface";
import { IBaseScheduleRelationDTO } from "@/pages/ScheduleArrangementDrawer/service/interface";
import { IOption } from "@/utils/interface";

export type TLoadingStore = LoadingStore<"loading" | "getWorkingShiftList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 班次信息 */
  workingShift: IWorkingShift[];
  /** @param 选中的班次信息 */
  scheduleRelationDTOList: IBaseScheduleRelationDTO[];
  /** @function 获取班次信息 */
  getWorkingShiftList(): Promise<void>;
  /** @function 打开抽屉 */
  openDrawer(initData?: IInitData): void;
  /** @function 关闭抽屉 */
  closeDrawer(): void;
  /** @function 选择班次 */
  addShift(record: IWorkingShift): void;
  /** @function 修改班次 */
  changeChannelInfo(options: IOption[], record: IBaseScheduleRelationDTO): void;
  /** @function 删除班次 */
  deleteShift(record: IBaseScheduleRelationDTO): void;
  /** @function 提交数据 */
  saveSelect(): void;
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
  propsStore: PropsStore<ISchedulePickerDrawerProps>;
}

export interface IRefs {}
