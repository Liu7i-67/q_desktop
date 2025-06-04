import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITaskList, ITaskListProps } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: ITaskList[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 列表搜索 */
  onSearch(info: ISearchInfo): void;
  /** @function 页面初始化-解析参数 */
  init(): void;
  /** @function 页码切换 */
  onPageChange(pagination: IPagination): void;
  /** @function 删除单项 */
  deleteRecord(record: ITaskList): Promise<void>;
  /** @function 列表项操作 */
  onAction(action: TAction, record: ITaskList): void;
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
  propsStore: PropsStore<ITaskListProps>;
  refs: IRefs;
}

export interface IRefs {
  form: FormInstance<ISearchInfo>;
  customerRef: React.RefObject<ICustomerDrawerRef>;
}

export interface ISearchInfo {
  /** @param 所属策略  */
  taskStrategyId?: string;
  /** @param 客户所属人  */
  ownerUserId?: string;
  /** @param 协作人 */
  collabUserId?: string;
  /** @param 任务所属人 */
  userIdList?: string[];
  /** @param 任务状态  */
  followStatusEnumList?: string[];
  /** @param 电话微信 */
  customerKeyword?: string;
  /** @param 任务开始时间 */
  startDate?: [Dayjs | null, Dayjs | null];
  /** @param 任务截止时间 */
  endDate?: [Dayjs | null, Dayjs | null];
  /** @param 任务完成时间 */
  followedTime?: [Dayjs | null, Dayjs | null];
}
