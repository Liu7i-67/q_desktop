import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IResBaseV1UserScheduleMonthView } from "@/service/base/v1/user-schedule/month-view";
import dayjs from "dayjs";
import { IScheduleArrangementDrawerRef } from "@/pages/ScheduleArrangementDrawer/interface";
import { RefObject } from "react";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 月份*/
  month: dayjs.Dayjs;
  /** @param 排版管理数据*/
  scheduleData: IResBaseV1UserScheduleMonthView[];
  /** @function 获取月排版数据 */
  getScheduleData: (month: dayjs.Dayjs) => Promise<void>;
  /** @function 改变月份 */
  changeMonth: (month: dayjs.Dayjs) => void;
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
}

export interface IRefs {
  drawerRef: RefObject<IScheduleArrangementDrawerRef>;
}
