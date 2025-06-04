import { ITXPeekModalRef } from "@/components/TXPeekModal/interface";
import { IUseTXTreeSelectFetchResult } from "@/components/TXTreeSelect";
import { ITransferCustomerModalRef } from "@/pages/customerManage/MyCustomerV2/modules/TransferCustomerModal/interface";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { IPagination, TRecord } from "@/utils/interface";
import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { IAddCustomerModalRef } from "../../modules/AddCustomerModal/interface";
import { IAssignModalRef } from "../../modules/AssignModal/interface";
import { ICustPeekModalRef } from "../../modules/CustPeekModal/interface";
import { IEditCustomerModalRef } from "../../modules/EditCustomerModal/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "getPageData">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /**@param 表格分页 */
  pagination: IPagination;
  /**@param 表格数据源 */
  dataSource: IResBusinessV1CustomerGetPage[];
  /**@function 获取表格数据 */
  getPageData: () => Promise<any>;
  /**@function 获取城市树 */
  getCityTree: () => Promise<any>;
  /**@function 重置搜索条件 */
  reset: () => void;
  /**@function 条件查询 */
  onSearch: () => void;
  /**@function 生成搜索参数 */
  generateSearchFormValues: () => TRecord;
  /**@function 分页改变 */
  onChangePageSize: (pagination: IPagination) => void;
  /**@function 查重 */
  checkCustomerPeek: (fieldKey: TFieldKey) => Promise<any>;
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
  addCustomerForm: FormInstance<any>;
  addCustomerModalRef: React.RefObject<IAddCustomerModalRef>;
  assignModalRef: React.RefObject<IAssignModalRef>;
  custPeekModalRef: React.RefObject<ICustPeekModalRef>;
  TXPeekModal: React.RefObject<ITXPeekModalRef>;
  transferRef: React.RefObject<ITransferCustomerModalRef>;
  editCustomerModalRef: React.RefObject<IEditCustomerModalRef>;
}

export interface IHookProps {
  regionTreeProps: IUseTXTreeSelectFetchResult;
}

export type TFieldKey = "phoneNumber" | "wechatNumber";

export interface IForm {
  /**@param 客户电话 */
  phoneNumber?: string;
  /**@param 客户微信 */
  wechatNumber?: string;
  /**@param 客户姓名 */
  customerName?: string;
  /**@param 城市 */
  areaCode?: string;
  /**@param 渠道 */
  channelIdList?: string[];
  /**@param 平台 */
  platformIdList?: string[];
  /**@param 主播 */
  liveStreamerIdList?: string[];
  /**@param 客户创建时间 */
  createTime?: Dayjs[];
  /**@param 客户指派时间 */
  assignTime?: Dayjs[];
  /**@param 是否指派 */
  assignedFlag?: boolean;
}
