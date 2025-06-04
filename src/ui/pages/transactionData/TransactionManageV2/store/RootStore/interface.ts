import { ITransactionRecordDetailModalRef } from "@/pages/CustomerDrawer/TransactionRecordDetailModal/interface";
import { IReqBusinessV1CustomerDealGetPage } from "@/service/business/v1/customer-deal/get-page";
import { IPagination, TAction } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import React from "react";
import {
  ITransactionManageV2,
  ITransactionManageV2Props,
} from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord" | "onExport" | "onUpload"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: ITransactionManageV2[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 删除单项 */
  deleteRecord(id: string): Promise<void>;
  /** @function 列表项操作 */
  onAction(action: TAction, record: ITransactionManageV2): void;
  /** @function 导出excel */
  onExport: () => Promise<void>;
  /**@function 对搜索表单值进行处理 */
  generateSearchFormRequest: () => Partial<IReqBusinessV1CustomerDealGetPage>;
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
  propsStore: PropsStore<ITransactionManageV2Props>;
  refs: IRefs;
}

export interface IRefs {
  form: FormInstance<ISearchForm>;
  transactionRecordDetailModalRef: React.RefObject<ITransactionRecordDetailModalRef>;
  transactionEditRecordDetailModalRef: React.RefObject<ITransactionRecordDetailModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}

export interface ISearchForm
  extends Partial<
    Pick<
      IReqBusinessV1CustomerDealGetPage,
      "phoneNumber" | "wechatNumber" | "dealStatus"
    >
  > {
  confirmTime?: [Dayjs | null, Dayjs | null];
  createTime?: [Dayjs | null, Dayjs | null];
  createUserIdList?: string[];
  orgIdList?: string[];
}
