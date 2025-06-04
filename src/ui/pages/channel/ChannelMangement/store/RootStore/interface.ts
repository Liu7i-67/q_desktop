import { IITXTreeSidebarRef } from "@/components/TXTreeSidebar/store/RootStore/interface";
import { IPagination } from "@/utils/interface";
import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IChannelMangement } from "../../interface";
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
  /** @param 左侧sidebar当前选择的节点key */
  channelType: string;
  /** @param 列表数据源 */
  dataSource: IChannelMangement[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @function 获取列表 */
  getList: () => Promise<void>;
  /** @function 搜索 */
  onSearch: () => void;
  /** @function 重置搜索 */
  onReset: () => void;
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
  txTreeSidebarRef: React.RefObject<IITXTreeSidebarRef>;
  addorEditModalRef: React.RefObject<IAddOrEditTypeModalRef>;
  editModalRef: React.RefObject<IEditModalRef>;
  form: FormInstance<ISearchInfo>;
}

export interface ISearchInfo {
  /** @param 渠道名称 */
  channelName?: string;
  /**  @param 是否启用 */
  enableFlag?: boolean;
  /** @param 负责人 */
  managerUserIdList?: string[];
}
