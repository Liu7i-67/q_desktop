import { IReqBusinessV1CustomerAssign } from "@/service/business/v1/customer/assign";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IAssignModalProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<"loading" | "onAssign">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IResBusinessV1CustomerGetPage | null;
  /** @function 打开弹窗 */
  openModal(initData?: IResBusinessV1CustomerGetPage): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 点击确认按钮 */
  onOk: () => Promise<any>;
  /** @function 指派 */
  onAssign: (request: IReqBusinessV1CustomerAssign) => Promise<any>;
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
  propsStore: PropsStore<IAssignModalProps>;
}

export interface IRefs {
  assiginModalForm: FormInstance<IAssiginModalForm>;
}

export interface IAssiginModalForm {
  userId: string;
}
