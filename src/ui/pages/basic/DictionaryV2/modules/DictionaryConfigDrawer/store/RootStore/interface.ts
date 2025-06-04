import { IResBaseV1SysDictValueDictValue } from "@/service/base/v1/sys-dict-value/dict-value";
import { IPagination } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import React from "react";
import { IDictionaryConfigDrawerProps, IInitData } from "../../interface";
import { IAddOrEditDictionaryValueModalRef } from "../../modules/AddOrEditDictionaryValueModal/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "getList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 列表数据源 */
  dataSource: IDataSource[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  /** @param 初始化数据 */
  initData: IInitData;
  /**@function 获取数据源 */
  getList: () => Promise<void>;
  /** @function 打开抽屉 */
  openDrawer(initData: IInitData): void;
  /** @function 关闭抽屉 */
  closeDrawer(): void;
  /**@function 打开新增、编辑字典值弹窗 */
  onOpenAddorEditDictionaryValueModal: (record: Partial<IDataSource>) => void;
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
  propsStore: PropsStore<IDictionaryConfigDrawerProps>;
}

export interface IRefs {
  addOrEditDictionaryValueModalRef: React.RefObject<IAddOrEditDictionaryValueModalRef>;
}

export interface IDataSource extends IResBaseV1SysDictValueDictValue {}
