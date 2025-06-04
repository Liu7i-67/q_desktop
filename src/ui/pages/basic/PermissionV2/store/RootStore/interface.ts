import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IPermissionV2Props, IDataSource } from "../../interface";
import { FormInstance } from "antd";
import { ITreeItem } from "@/utils/interface";
import { IResBaseV1SysMenuTargetTree } from "@/service/base/v1/sys-menu/tree";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "deleteRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IDataSource[];
  /** @param 权限名称 */
  menuName?: string;
  /** @param 权限id */
  targetId: string;
  /** @param 权限类型 */
  targetEnum: "ROLE" | "USER";
  /** @param table展开的keys */
  expandedRowKeys: string[];
  /** @param 权限keys */
  permissionKeysList: string[];
  /** @param 搜索条件 */
  dataScopeEnum: string;
  /** @function 获取列表 */
  getList(): Promise<void>;
  /** @function 获取选中角色/员工的权限 */
  getPermission(): Promise<void>;
  /** @function 改变table展开的keys */
  handleExpandRowsChange(permissionKeys: string[]): void;
  /** @function 列表Switch操作 */
  handleSetPermissionTreeSwitch(checked: boolean, id: string): void;
  /** @function 列表Select操作 设置权限范围 */
  handleSetDataScope(value: string, id: string): void;
  /** @function 设置权限 */
  setPermission(): Promise<void>;
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
  propsStore: PropsStore<IPermissionV2Props>;
  refs: IRefs;
}

export interface IRefs {
  /** @param 搜索Form */
  searchForm: FormInstance<ISearchInfo>;
}

export interface ISearchInfo {
  /** @param 权限名称 */
  menuName?: string;
}
