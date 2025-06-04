import { IITXTreeSidebarRef } from "@/components/TXTreeSidebar/store/RootStore/interface";
import { IReqBaseV1ProjectGetPage } from "@/service/base/v1/project/get-page";
import { IPagination } from "@/utils/interface";
import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import React from "react";
import { IProjectManagment } from "../../interface";
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
  dataSource: IProjectManagment[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 医美项目分类 */
  typeId: string;
  /** @function 获取表格列表 */
  getList: () => Promise<void>;
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
  form: FormInstance<
    Pick<IReqBaseV1ProjectGetPage, "projectName" | "enableFlag">
  >;
  addOrEditTypeModalRef: React.RefObject<IAddOrEditTypeModalRef>;
  txTreeSidebarRef: React.RefObject<IITXTreeSidebarRef>;
  editModalRef: React.RefObject<IEditModalRef>;
}
