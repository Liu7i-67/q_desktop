import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IFollowUpModalProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";
import { Dayjs } from "dayjs";
import { IReqBusinessV1CustomerFollowSave } from "@/service/business/v1/customer-follow/save";

export type TLoadingStore = LoadingStore<"loading" | "onSaveCustomerFollow">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /**@function 新增客户跟进*/
  onSaveCustomerFollow: (request: IReqBusinessV1CustomerFollowSave) => void;
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
  propsStore: PropsStore<IFollowUpModalProps>;
  refs: IRefs;
}

export interface IRefs {
  /**@param 跟进弹窗 form 实例对象 */
  followUpForm: FormInstance<ISearchInfo>;
}

export interface ISearchInfo {
  /** @param 跟进内容 */
  memo: string;
  /** @param 下次跟进时间 */
  nextDate: Dayjs;
}
