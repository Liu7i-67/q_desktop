import {
  IReqBaseV1SysDictGetPage,
  IResBaseV1SysDictGetPage,
} from "@/service/base/v1/sys-dict/get-page";
import { IPagination, TAction } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import React from "react";
import { IDictionaryV2, IDictionaryV2Props } from "../../interface";
import { IAddOrEditDictModalRef } from "../../modules/AddOrEditDictModal/interface";
import { IDictionaryConfigDrawerRef } from "../../modules/DictionaryConfigDrawer/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IDictionaryV2[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 列表项操作 */
  onAction(action: TAction, record: IDictionaryV2): void;
  /** @function 打开新增、编辑字典弹窗 */
  onOpenAddOrEditDictModal: (record?: IResBaseV1SysDictGetPage) => void;
  /** @function 打开字典配置抽屉 */
  openDictConfigDrawer: (dictCode: string, dictName: string) => void;
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
  propsStore: PropsStore<IDictionaryV2Props>;
  refs: IRefs;
}

export interface IRefs {
  form: FormInstance<IRefsForm>;
  addOrEditDictModalRef: React.RefObject<IAddOrEditDictModalRef>;
  dictionaryConfigDrawerRef: React.RefObject<IDictionaryConfigDrawerRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}

export interface IRefsForm
  extends Pick<IReqBaseV1SysDictGetPage, "dictCode" | "dictName"> {}
