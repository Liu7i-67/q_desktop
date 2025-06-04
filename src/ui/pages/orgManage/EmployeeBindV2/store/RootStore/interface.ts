import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPagination } from "@/utils/interface";
import { IResBaseV1UserOrganizationRelationGetPage } from "@/service/base/v1/user-organization-relation/get-page";
import { FormInstance } from "antd";
import { RefObject } from "react";
import { IEditModalRef } from "../../modules/EditModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteEmployee"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBaseV1UserOrganizationRelationGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 搜索 */
  onSearch: () => void;
  /** @function 重置 */
  onReset: () => void;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除分组 */
  deleteEmployee(id: string): Promise<void>;
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
  /** @param 搜索表单 */
  searchForm: FormInstance<ISearchInfo>;
  /** @param 新增/编辑弹窗 */
  editRef: RefObject<IEditModalRef>;
}

export interface ISearchInfo {
  /** @param 员工ID */
  userId?: string;
}
