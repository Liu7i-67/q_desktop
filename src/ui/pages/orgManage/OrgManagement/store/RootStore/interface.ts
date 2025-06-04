import { IITXTreeSidebarRef } from "@/components/TXTreeSidebar/store/RootStore/interface";
import { IPagination } from "@/utils/interface";
import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { FormInstance, TreeDataNode } from "antd";
import React from "react";
import { IOrgManagement } from "../../interface";
import { IAddOrEditTypeModalRef } from "../../modules/AddOrEditTypeModal/interface";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "getList" | "deleteGroup">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IOrgManagement[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 所在城市数据 */
  cityTree: TreeDataNode[];
  /** @param 渠道分类 */
  orgType: string;
  /** @function 获取表格列表 */
  getList: () => Promise<void>;
  /** @function 初始化城市下拉框数据 */
  initCityTree: () => Promise<void>;
  /** @function 选择sidebar树节点后回调*/
  onSelectTreeNode: (selectedKeys: string[]) => void;
  /** @function 重置条件搜索 */
  onReset: () => void;
  /** @function 搜索 */
  onSearch: () => void;
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
  form: FormInstance<IForm>;
  addOrEditTypeModalRef: React.RefObject<IAddOrEditTypeModalRef>;
  txTreeSidebarRef: React.RefObject<IITXTreeSidebarRef>;
  editModalRef: React.RefObject<IEditModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}

export interface IForm {
  /**@param 机构名称 */
  orgName?: string;
  /**@param 城市 */
  areaCode?: string;
  /**@param 是否启用 */
  enableFlag?: boolean;
}
