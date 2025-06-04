import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEmployeeBindV2Props } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { FormInstance } from "antd";
import { RefObject } from "react";
import { IResBaseV1UserChannelRelationGetPage } from "@/service/base/v1/user-channel-relation/getPage";
import { IEditModalRef } from "../../modules/EditModal/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteUserOrgRelation"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBaseV1UserChannelRelationGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除 */
  deleteUserOrgRelation(id: string): Promise<void>;
  /** @function 列表项操作 */
  recordAction(
    record: IResBaseV1UserChannelRelationGetPage,
    action: TAction
  ): void;
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
  propsStore: PropsStore<IEmployeeBindV2Props>;
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
