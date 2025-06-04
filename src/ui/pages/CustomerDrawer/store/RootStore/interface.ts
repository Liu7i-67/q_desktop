import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ICustomerDrawerProps, IInitData, TCustomerTab } from "../../interface";
import { TabsProps } from "antd";
import { IResBusinessV1Customer } from "@/service/business/v1/customer";
import { RefObject } from "react";
import { IEditModalRef } from "@/pages/customerManage/MyCustomerV2/modules/EditModal/interface";

export type TLoadingStore = LoadingStore<"loading" | "getCustomerDetail">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param tab项 */
  tabs: TabsProps["items"];
  /** @param 当前激活的key */
  activeKey: TCustomerTab;
  /** @param 需要渲染的页面 */
  renderSet: Set<TCustomerTab>;
  /** @param 客户的详情信息 */
  detail: IResBusinessV1Customer | null;
  /** @function 修改激活的key */
  changeActiveKey(key: TCustomerTab): void;
  /** @function 打开抽屉 */
  openDrawer(initData?: IInitData): void;
  /** @function 关闭抽屉 */
  closeDrawer(): void;
  /** @function 获取客户详情信息 */
  getCustomerDetail(): Promise<any>;
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
  propsStore: PropsStore<ICustomerDrawerProps>;
}

export interface IRefs {
  /** @param 客户编辑弹窗*/
  editRef: RefObject<IEditModalRef>;
}
