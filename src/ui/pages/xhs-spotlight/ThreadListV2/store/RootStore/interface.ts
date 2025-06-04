import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IThreadListV2Props } from "../../interface";
import { IPagination } from "@/utils/interface";
import { IResBusinessV1LittleRedBookLeadsPushGetPage } from "@/service/business/v1/little-red-book-leads-push/get-page";
import dayjs from "dayjs";

export type TLoadingStore = LoadingStore<"loading" | "getList" | "exportList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBusinessV1LittleRedBookLeadsPushGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 导出 */
  exportList(): Promise<void>;
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
  propsStore: PropsStore<IThreadListV2Props>;
  refs: IRefs;
}

export interface IRefs {}

export interface ISearchInfo {
  /** @param 计划名称*/
  campaignName?: string;
  /** @param 创建日期*/
  createTime?: [dayjs.Dayjs, dayjs.Dayjs];
  /** @param 小红书来源*/
  littleRedBookLeadsSource?: string;
  /** @param 电话号码*/
  phoneNum?: string;
  /** @param 微信号*/
  wechat?: string;
  /** @param 用户ID*/
  redId?: string;
  /** @param 用户地址*/
  address?: string;
  /** @param 线索标签*/
  leadsTagList?: string[];
  /** @param 私信接收人*/
  channelIdList?: string[];
}
