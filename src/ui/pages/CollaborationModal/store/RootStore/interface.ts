import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ICollaborationModalProps, IInitData } from "../../interface";
import {
  IResBusinessV1CustomerCollabDetail,
  TCollabType,
} from "@/service/business/v1/customer-collab/detail";
import { IOption } from "@/utils/interface";

export type TLoadingStore = LoadingStore<"loading" | "getDetail" | "submit">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 详情信息 */
  collabs: IResBusinessV1CustomerCollabDetail[];
  /** @function 修改合作类型 */
  changeRecordCollabType(
    record: IResBusinessV1CustomerCollabDetail,
    value: TCollabType
  ): void;
  /** @function 修改合作比率 */
  changeRecordRatio(
    record: IResBusinessV1CustomerCollabDetail,
    value: number
  ): void;
  /** @function 修改合作用户 */
  changeRecordUser(
    record: IResBusinessV1CustomerCollabDetail,
    value: IOption
  ): void;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 获取协作关系详情 */
  getDetail(): Promise<void>;
  /** @function 添加协作 */
  handleAdd(): void;
  /** @function 删除协作 */
  handleDelete(record: IResBusinessV1CustomerCollabDetail): void;
  /** @function 提交表单数据 */
  submit(): Promise<void>;
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
  propsStore: PropsStore<ICollaborationModalProps>;
}

export interface IRefs {}
