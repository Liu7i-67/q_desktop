import { IReqBaseV1ProjectSave } from "@/service/base/v1/project/save";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IEditModalProps, IInitData } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "onCreateProject" | "onEditProject" | "getProjectDetail"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 图片上传loaing */
  uploadImageLoading: boolean;
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 弹窗确认按钮回调 */
  onOk: () => void;
  /** @function 获取项目详情 */
  getProjectDetail: () => Promise<any>;
  /** @function 获取表单数据*/
  getFormData: () => Promise<any>;
  /** @function 新增项目 */
  onCreateProject: () => Promise<any>;
  /** @function 编辑项目 */
  onEditProject: () => Promise<any>;
  /** @function 初始化新增项目弹窗部分内容 */
  initCreateModalForm: () => void;
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
  propsStore: PropsStore<IEditModalProps>;
}

export interface IRefs {
  editForm: FormInstance<IReqBaseV1ProjectSave>;
}
