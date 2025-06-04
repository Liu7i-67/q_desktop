import { ImageFile } from "@/utils/upload";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { IEditModalProps, IInitData } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "onCreateOrg" | "onEditOrg" | "getOrgDetail"
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
  /** @function 获取机构详情 */
  getOrgDetail: () => Promise<any>;
  /** @function 获取表单数据*/
  getFormData: () => Promise<any>;
  /** @function 新增机构 */
  onCreateOrg: () => Promise<any>;
  /** @function 编辑机构 */
  onEditOrg: () => Promise<any>;
  /** @function 初始化新增机构弹窗部分内容 */
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
  editForm: FormInstance<IForm>;
}

export interface IForm {
  /**@param 机构名称 */
  orgName: string;
  /**@param 机构编码 */
  orgCode?: string;
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 联系人 */
  contactName?: string;
  /**@param 联系人电话 */
  contactPhone?: string;
  /**@param 机构成立年份 */
  establishYear?: number;
  /**@param 法定代表人 */
  legalPerson?: string;
  /**@param 机构邮箱 */
  email?: string;
  /**@param 机构分类 */
  orgType: string;
  /**@param 合作状态 */
  cooperationStatus: string;
  /**@param 客户到期提醒天数 */
  remainderDays: number;
  /**@param 所在城市 */
  areaCode: string;
  /**@param 详细地址 */
  address: string;
  /**@param 营业日期 */
  operatingDate?: (Dayjs | undefined)[];
  /**@param 营业时间 */
  operatingTime?: (Dayjs | undefined)[];
  /**@param 面积（平方米） */
  squareMetre?: number;
  /**@param 咨询室数量 */
  consultationRoomNum?: number;
  /**@param 手术室数量 */
  operatingRoomNum?: number;
  /**@param 连锁机构 */
  chainFlag?: boolean;
  /**@param 营业执照编号 */
  businessLicenseNo?: string;
  /**@param 医疗许可证编号 */
  medicalLicenseNo?: string;
  /**@param 营业范围 */
  businessScope?: string;
  /**@param 医院科室 */
  departmentName?: string;
  /**@param 机构描述 */
  description?: string;
  /**@parm 机构备注 */
  memo?: string;
  /**@param LOGO */
  logoImg?: ImageFile[];
  /**@param 营业执照图片 */
  businessLicenseImg?: ImageFile[];
  /**@param 认证证书图片 */
  authCertificateImg?: ImageFile[];
  /**@param 荣誉证书图片 */
  honorCertificateImg?: ImageFile[];
  /**@param 医疗许可证 */
  medicalLicenseImg?: ImageFile[];
  /**@param 机构环境图片 */
  environmentImg?: ImageFile[];
}
