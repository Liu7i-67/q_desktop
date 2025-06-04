import { IRepeatItem } from "@/pages/customerManage/MyCustomerV2/modules/EditModal/store/RootStore/interface";
import { IWechatQrCodeDTO } from "@/service/business/v1/customer/save";
import { IOption, TRecord } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance, TreeDataNode } from "antd";
import { IAddCustomerModalProps, IInitData } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "onAddCustomer">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 城市数据 */
  regionTree: TreeDataNode[];
  /** @param 查重电话、微信列表 */
  repeatList: IRepeatItem[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 点击确认按钮 */
  onOk: () => Promise<any>;
  /**@function 新增客户 */
  onAddCustomer: (request: TRecord) => Promise<any>;
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
  propsStore: PropsStore<IAddCustomerModalProps>;
}

export interface IRefs {
  addCustomerForm: FormInstance<IAddCustomerForm>;
}
export interface IAddCustomerForm {
  /**@param 来源渠道类型 */
  leadsType: string;
  /**@param 渠道 */
  channelName?: IOption;
  /**@param 主播 */
  liveStreamerName?: IOption;
  /**@param 平台 */
  platformId?: string;
  /**@param 客户姓名 */
  customerName?: string;
  /**@param 客户电话 */
  phoneNumber?: string;
  /**@param 客户微信 */
  wechatNumber?: string;
  /**@param 所在城市 */
  areaCode?: string;
  /**@param 指派咨询师 */
  ownerUserId: string;
  /**@param 备注 */
  memo?: string;
  /**@param 微信二维码 */
  wechatQrCode?: IWechatQrCodeDTO[];
}
