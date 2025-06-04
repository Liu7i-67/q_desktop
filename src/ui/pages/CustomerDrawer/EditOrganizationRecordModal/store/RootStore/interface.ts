import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IEditOrganizationRecordModalProps, IInitData } from "../../interface";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { IOption, ITreeItem } from "@/utils/interface";
import { IReqBusinessV1OrganizationcontactrecordSave } from "@/service/business/v1/organizationcontactrecord/save";

export type TLoadingStore = LoadingStore<
  "loading" | "getOrgTreeData" | "submit" | "updateRecord"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  initData: IInitData | null;
  /** @param 机构树 */
  orgTree: ITreeItem[];
  /** @function 打开弹窗 */
  openModal(initData?: IInitData): void;
  /** @function 关闭弹窗 */
  closeModal(): void;
  /** @function 提交表单 */
  submit(): Promise<void>;
  /** @function 编辑操作 */
  updateRecord(req: IReqBusinessV1OrganizationcontactrecordSave): Promise<void>;
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
  propsStore: PropsStore<IEditOrganizationRecordModalProps>;
}

export interface IRefs {
  /** @param 表单ref */
  form: FormInstance<IFormInfo>;
}

export interface IFormInfo {
  /** @param 联系时间 */
  contactTime: Dayjs;
  /** @param 联系机构 */
  organizationId: IOption;
}
