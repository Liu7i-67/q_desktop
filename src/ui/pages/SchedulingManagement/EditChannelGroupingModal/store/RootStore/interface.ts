import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditChannelGroupingModalProps } from "../../interface";
import { FormInstance } from "antd";
import { IOption } from "@/utils/interface";
import { IReqAddChannelGroup } from "@/pages/SchedulingManagement/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getChannelList" | "updateGroup" | "submit"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @function 获取小红书渠道信息 */
  getChannelList(text?: string): Promise<void>;
  /** @function 提交操作 */
  submit(): Promise<void>;
  /** @function 更新操作 */
  updateGroup(req: IReqAddChannelGroup): Promise<void>;
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
  propsStore: PropsStore<IEditChannelGroupingModalProps>;
  refs: IRefs;
}

export interface IRefs {
  form: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 分组名称 */
  groupName: string;
  /** @param 渠道集合 */
  channelIdList: IOption[];
}
