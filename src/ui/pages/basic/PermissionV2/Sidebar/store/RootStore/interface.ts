import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ISidebarProps } from "../../interface";
import { IPagination } from "@/utils/interface";

export type TLoadingStore = LoadingStore<
  "loading" | "getRoleList" | "getUserList"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表展示类型*/
  sidebarType: "ROLE" | "USER";
  /** @param 搜索值 */
  searchValue: string | undefined;
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 列表数据 */
  sideList: ISideList[];
  /** @param 选中的id */
  checkId: string;
  /** @function 修改展示类型 */
  changeSidebarType: (type: "ROLE" | "USER") => void;
  /** @function 改变搜索值 */
  changeSearchValue: (value: string) => void;
  /** @function 获取角色列表 */
  getRoleList: () => Promise<void>;
  /** @function 获取员工列表 */
  getUserList: () => Promise<void>;
  /** @function 切换选中 */
  onChecked: (id: string) => void;
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
  propsStore: PropsStore<ISidebarProps>;
}

export interface IRefs {}

export interface ISideList {
  id: string;
  name: string;
}
