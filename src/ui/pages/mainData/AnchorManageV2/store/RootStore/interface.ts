import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IAnchorManageV2Props } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { FormInstance } from "antd";
import { RefObject } from "react";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { IResBaseV1LiveStreamerGetPage } from "@/service/base/v1/live-streamer/get-page";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBaseV1LiveStreamerGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 操作渲染 */
  recordAction(record: IResBaseV1LiveStreamerGetPage, action: TAction): void;
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
  propsStore: PropsStore<IAnchorManageV2Props>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 搜索表单 */
  searchForm: FormInstance<ISearchInfo>;
  /** @param 新增/编辑弹窗 */
  editRef: RefObject<IEditModalRef>;
}

export interface ISearchInfo {
  /**@param 主播姓名 */
  streamerName?: string;
  /**@param 是否启用 */
  enableFlag?: boolean;
}
