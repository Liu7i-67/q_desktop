import { ITXPeekModalRef } from "@/components/TXPeekModal/interface";
import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";
import { IEditDispatchRecordModalRef } from "@/pages/CustomerDrawer/EditDispatchRecordModal/interface";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";
import {
  IReqBusinessV1CustomerGetPage,
  IResBusinessV1CustomerGetPage,
} from "@/service/business/v1/customer/get-page";
import { IPagination } from "@/utils/interface";
import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { FormInstance, TreeDataNode } from "antd";
import dayjs from "dayjs";
import { RefObject } from "react";
import { ITreeData } from "../../interface";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { IMergeCustomerModalRef } from "../../modules/MergeCustomerModal/interface";
import { IRepeatModalRef } from "../../modules/RepeatModal/interface";
import { ITransferCustomerModalRef } from "../../modules/TransferCustomerModal/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  | "loading"
  | "getList"
  | "handleConfirmTransferCustomer"
  | "onMergeCustomerSearch"
  | "handleConfirmMergeCustomer"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBusinessV1CustomerGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 所在城市树 */
  regionTree: TreeDataNode[];
  /** @param 首次咨询项目树 */
  firstConsultTree: ITreeData[];
  /** @param 转移客户Visible */
  transferVisible: boolean;
  /** @param 选中的转移客户 */
  selectedRowKeys: React.Key[];
  /** @function 列表搜索 */
  onSearch(): void;
  /** @function 列表重置 */
  onReset(): void;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 切换分页 */
  onPageChange(pagination: IPagination): void;
  /** @function 微信/电话查重 */
  getRepeatUser(key: "wechatNumber" | "phoneNumber"): Promise<void>;
  /** @function 获取行政区划树 */
  getRegionTree(): Promise<void>;
  /** @function 获取首次咨询项目树 */
  getFirstConsultTree(): Promise<void>;
  /** @function 转移客户 */
  handleToggleTransferCustomer(): void;
  /** @function 选择转移客户 */
  onSelectChange(selectedRowKeys: React.Key[]): void;
  /** @function 关闭转移客户弹窗后清空数据 */
  afterCloseTransferModal(): void;
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
  searchForm: FormInstance<ISearchForm>;
  /** @param 查重弹窗ref */
  repeatRef: RefObject<IRepeatModalRef>;
  /** @param 新增/编辑弹窗 */
  editRef: RefObject<IEditModalRef>;
  /** @param 转移弹窗 */
  transferRef: RefObject<ITransferCustomerModalRef>;
  /** @param 详情弹窗 */
  customerDrawerRef: RefObject<ICustomerDrawerRef>;
  /** @param 派单弹窗 */
  editDispatchRecordRef: RefObject<IEditDispatchRecordModalRef>;
  /** @param 合并弹窗 */
  mergeCustomerModalRef: RefObject<IMergeCustomerModalRef>;
  /** @param 协作弹窗ref */
  collRef: RefObject<ICollaborationModalRef>;
  /** @param 查重弹窗 */
  TXPeekModalRef: RefObject<ITXPeekModalRef>;
}

export type ISearchInfo = Omit<IReqBusinessV1CustomerGetPage, "page" | "size">;

export interface ISearchForm {
  ids?: string[];
  ownerUserId?: string;
  onlyCollabType: string;
  labelRelationLabelValue: {
    label: string;
    value: string;
  }[];
  createTime?: [dayjs.Dayjs, dayjs.Dayjs];
  dealDate?: [dayjs.Dayjs, dayjs.Dayjs];
  wechatNumber?: string;
  phoneNumber?: string;
}
