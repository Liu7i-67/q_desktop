import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPlatformManageV2Props } from "../../interface";
import { IPagination } from "@/utils/interface";
import { FormInstance } from "antd";
import { RefObject } from "react";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { IResBaseV1PlatformGetPage } from "@/service/base/v1/platform/get-page";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBaseV1PlatformGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList(): Promise<void>;
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
  propsStore: PropsStore<IPlatformManageV2Props>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 搜索表单 */
  searchForm: FormInstance<ISearchInfo>;
  /** @param 新增/编辑弹窗 */
  editRef: RefObject<IEditModalRef>;
}

export interface ISearchInfo {
  /** @param 平台名称 */
  platformName?: string;
  /** @param 是否启用 */
  enableFlag?: boolean;
}
