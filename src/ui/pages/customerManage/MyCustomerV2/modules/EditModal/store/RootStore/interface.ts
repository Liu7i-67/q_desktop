import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance, TreeDataNode } from "antd";
import dayjs from "dayjs";
import { RootStore } from ".";
import { IEditModalProps, IInitData, ITreeData } from "../../interface";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export interface IRepeatItem {
  id: string;
  value: string[];
  ownerName: string;
}

export type TLoadingStore = LoadingStore<
  "loading" | "addCustomer" | "updateCustomer"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param  首次项目分类树 */
  firstConsultTree: ITreeData[];
  /** @param  地区树 */
  regionTree: TreeDataNode[];
  /** @param 查重重复电话、微信 */
  repeatList: IRepeatItem[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取地区树 */
  getFirstConsultTree(): Promise<void>;
  /** @function 获取项目分类树 */
  getRegionTree(): void;
  /** @function 获取详情 */
  getCustomerDetail(id: string): Promise<void>;
  /** @function 提交表单 */
  submitForm(): void;
  /** @function 调用新增、编辑接口后，根据接口返回值查重电话、微信 */
  handleValidateDuplicateCheck: (responseData: any) => void;
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
  propsStore: PropsStore<IEditModalProps>;
}

export interface IRefs {
  /** @param 新增/编辑Form */
  editForm: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 客户名称 */
  customerName?: string;
  /** @param 所在城市 */
  areaCode?: string;
  /** @param 微信状态 */
  wechatStatus: "UN_PASSED" | "PASSED" | "UN_DEFINED";
  /** @param 客户标签 */
  labelValueList?: { label: string; value: string }[];
  /** @param 客户类型 */
  customerType?: string;
  /** @param 微信通过时间 */
  wechatPassTime?: dayjs.Dayjs;
  /** @param 微信 */
  wechatNumber?: string[];
  /** @param 电话 */
  phoneNumber?: string[];
  /** @param 首次咨询项目 */
  intentionalProjectPostDTOList?: string[];
  /** @param 备注 */
  memo?: string;
  /**@param 渠道来源 0投放1电商 */
  leadsType?: string;
  /**@param 渠道id */
  channelId?: string;
  /**@param 主播id */
  liveStreamerId?: string;
  /**@param 平台id */
  platformId?: string;
}
