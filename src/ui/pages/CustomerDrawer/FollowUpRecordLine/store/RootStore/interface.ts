import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IFollowUpRecord, IFollowUpRecordLineProps } from "../../interface";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { ITaskSettingCheckModalRef } from "@/pages/CustomerDrawer/TaskSettingCheckModal/interface";

export type TLoadingStore = LoadingStore<"loading" | "getList" | "onSubmit">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @function 新增跟进 */
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
  propsStore: PropsStore<IFollowUpRecordLineProps>;
}

export interface IRefs {
  /** @param 跟进弹窗 form 实例对象 */
  followUpForm: FormInstance<ISearchInfo>;
  /** @param 任务重复检测弹窗 */
  checkRef: React.RefObject<ITaskSettingCheckModalRef>;
}

export interface ISearchInfo {
  /** @param 跟进内容 */
  memo: string;
  /** @param 下次跟进时间 */
  nextDate: Dayjs;
}

export interface IRenderDom {
  type: "year" | "timeline" | "day";
  label?: string;
  records?: IFollowUpRecord[];
}
