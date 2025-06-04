import { IITXTreeSidebarRef } from "@/components/TXTreeSidebar/store/RootStore/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { IDepartmentV2Props } from "../../interface";
import { IAddOrEditTypeModalRef } from "../../modules/AddOrEditTypeModal/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"getDepartmentDetail">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 左侧sidebar当前选择的节点key */
  deptType: string;
  /** @param 部门详情信息 */
  deptDetailInfo: any;
  /** @function 选择sidebar树节点后回调*/
  onSelectTreeNode: (selectedKeys: string[]) => void;
  /** @function 获取部门详情 */
  getDepartmentDetail: () => Promise<void>;
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
  propsStore: PropsStore<IDepartmentV2Props>;
  refs: IRefs;
}

export interface IRefs {
  addorEditModalRef: React.RefObject<IAddOrEditTypeModalRef>;
  txTreeSidebarRef: React.RefObject<IITXTreeSidebarRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
