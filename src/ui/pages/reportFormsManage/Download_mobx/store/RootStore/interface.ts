import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { FormInstance } from "antd";

export type TLoadingStore = LoadingStore<"loading" | "getDownloadList">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param  分页数据*/
  dataSource: any[];
  /** @param 总条数*/
  total: number;
  /** @param 当前页码*/
  current: number;
  /** @param 每页条数*/
  pageSize: number;
  /** @function 获取下载分页数据*/
  getDownloadList: (params?: {
    page: number;
    size: number;
    purpose?: string;
  }) => Promise<void>;
  /** @function 改变分页*/
  onChangePageSize: (page: number, pageSize: number) => void;
  /** @function 搜索*/
  onSearch: () => void;
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
  /** 搜索表单form*/
  searchForm: FormInstance;
}
