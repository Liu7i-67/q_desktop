import {
  IDeptListDTO,
  IReqBaseV1SysUserSave,
} from "@/service/base/v1/sys-user/save";
import { IOption } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IEditEmployeeModalProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "getRoleDetail" | "editEmployee" | "addEmployee"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 抽屉是否可见 */
  open: boolean;
  /** @param 初始化数据 */
  recordId: string;
  /** @function 打开弹窗 */
  openModal: (recordId?: string) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
  /** @function 获取员工详情 */
  getRoleDetail: () => Promise<void>;
  /** @function 新增、编辑员工确认回调 */
  onOk: () => void;
  /** @function 新增员工 */
  addEmployee: () => Promise<void>;
  /** @function 编辑员工 */
  editEmployee: () => Promise<void>;
  /** @function 获取form表单数据 */
  generateFormValues: () => Promise<IForm | undefined>;
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
  propsStore: PropsStore<IEditEmployeeModalProps>;
}

export interface IRefs {
  addForm: FormInstance<IForm>;
}

export interface IGenerateFormValuesResult
  extends Omit<IReqBaseV1SysUserSave, "roleList"> {
  roleList: IIGenerateFormRoleListDTO[];
}

export interface IIGenerateFormRoleListDTO {
  label: string;
  disabled?: boolean;
  key: string;
  value: string;
}

export interface IForm {
  /**@param 员工_部门关联关系新增、修改通用DTO */
  deptList?: IDeptListDTO[];
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 主键id */
  id?: string;
  /**@param 昵称 */
  nickname?: string;
  /**@param 关联机构id */
  orgId?: string;
  /**@param 手机号 */
  phoneNumber: string;
  /**@param 角色id列表*/
  roleList?: string[];
  /**@param 员工账号 */
  userAccount: string;
  /**@param 员工姓名 */
  userName: string;
  /**@param 员工类型,可用值:CUSTOMER_SERVICE,CONSULTANT,ORG,BUSINESS,ACCOUNTANT*/
  userType: string;
  /**@param 关联的企业微信员工id */
  wecomUserId?: string;
  /**@param 关联机构 */
  orgName?: IOption;
}
