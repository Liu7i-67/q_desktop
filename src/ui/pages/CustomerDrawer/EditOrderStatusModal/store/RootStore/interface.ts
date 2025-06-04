import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditOrderStatusModalProps, IShowData } from "../../interface";
import { FormInstance } from "antd";
import { ImageFile } from "@/utils/upload";

export type TLoadingStore = LoadingStore<
  "loading" | "editOrderStatus" | "onOk"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param  默认数据*/
  defaultData: IShowData;
  /** @param 弹窗visible*/
  visible: boolean;
  /** @param 展示上传重单截图*/
  showUpload?: string;
  /** @function 打开弹窗*/
  open: (initData: IShowData) => void;
  /** @function 关闭弹窗*/
  onCancel: () => void;
  /** @function 确认弹窗*/
  onOk: () => void;
  /** @function 修改派单状态*/
  editOrderStatus: (data: {
    dispatchId: string;
    dispatchStatus: string;
    forceHandleFlag: boolean;
    operateImg: ImageFile[];
    memo: string;
  }) => void;
  /** @function 派单账号改变*/
  selectChange: (value: string) => void;
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
  propsStore: PropsStore<IEditOrderStatusModalProps>;
}

export interface IRefs {
  form: FormInstance;
}
