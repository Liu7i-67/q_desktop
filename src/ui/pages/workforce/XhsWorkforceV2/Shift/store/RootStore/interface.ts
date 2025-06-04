import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from ".";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IResBaseV1WorkingShiftGetList } from "@/service/base/v1/working-shift/get-list";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { RefObject } from "react";

export type TLoadingStore = LoadingStore<"loading" | "getList" | "deleteShift">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBaseV1WorkingShiftGetList[];
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除班次 */
  deleteShift(id: string): Promise<void>;
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
  editRef: RefObject<IEditModalRef>;
}
