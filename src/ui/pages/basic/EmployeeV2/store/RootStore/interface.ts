import {
  IReqBaseV1SysUserGetPage,
  IResBaseV1SysUserGetPage,
} from "@/service/base/v1/sys-user/get-page";
import { IPagination } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IEmployeeV2Props } from "../../interface";
import { IEditEmployeeModalRef } from "../../modules/EditEmployeeModal/interface";
import { IRestPasswordInfoModalRef } from "../../modules/RestPasswordInfoModal/interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "getList" | "onRestPassword"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表数据源 */
  dataSource: IResBaseV1SysUserGetPage[];
  /** @param 列表分页信息 */
  pagination: IPagination;
  /** @param 当前的搜索数据 */
  formInfo: ISearchInfo;
  /** @function 获取列表 */
  getList: () => Promise<void>;
  /** @function 搜索 */
  onSearch: () => void;
  /** @function 表格分页改变 */
  onPageChange: (pagination: IPagination) => void;
  /** @function 重置密码 */
  onRestPassword: (id: string) => Promise<void>;
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
  propsStore: PropsStore<IEmployeeV2Props>;
  refs: IRefs;
}

export interface IRefs {
  form: FormInstance<IReqBaseV1SysUserGetPage>;
  editEmployeeModalRef: React.RefObject<IEditEmployeeModalRef>;
  resetPasswordInfoRef: React.RefObject<IRestPasswordInfoModalRef>;
}

export interface ISearchInfo {
  /** @param 分组名称 */
  groupName?: string;
}
