import { IImgDTO } from "./get-page";

export interface IReqBaseV1OrganizationId {
  /**@param 请求数据详情的数据项id */
  id: string;
}

export interface IResBaseV1OrganizationId {
  /**@param 详细地址 */
  address: string;
  /**@param 机构所在城市编码 */
  areaCode: string;
  /**@param 机构所在城市名称 */
  areaName?: string;
  /**@param 认证证书图片 */
  authCertificateImg: IImgDTO[];
  /**@param 营业执照图片 */
  businessLicenseImg: IImgDTO[];
  /**@param 营业执照编号 */
  businessLicenseNo?: string;
  /**@param 营业范围 */
  businessScope?: string;
  /**@param 是否连锁机构 */
  chainFlag: boolean;
  /**@param 咨询室数量 */
  consultationRoomNum?: number;
  /**@param 联系人姓名 */
  contactName: string;
  /**@param 联系人电话 */
  contactPhone: string;
  /**@param 合作状态,可用值:PAUSED,IN_PROGRESS */
  cooperationStatus: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 机构科室 */
  departmentName?: string;
  /**@param 机构描述 */
  description: string;
  /**@param 机构邮箱地址 */
  email: string;
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 机构环境图片 */
  environmentImg: IImgDTO[];
  /**@param 成立年份 */
  establishYear: number;
  /**@param 荣誉证书图片 */
  honorCertificateImg: IImgDTO[];
  /**@param 数据id */
  id: string;
  /**@param 法人姓名 */
  legalPerson: string;
  /**@param logo图片 */
  logoImg: IImgDTO[];
  /**@param 医疗许可证图片 */
  medicalLicenseImg: IImgDTO[];
  /**@param 医疗许可证编号 */
  medicalLicenseNo?: string;
  /**@param 机构备注 */
  memo: string;
  /**@param 营业日期结束日期 */
  operatingDateEnd: string;
  /**@param 营业日期开始日期 */
  operatingDateStart: string;
  /**@param 手术室数量 */
  operatingRoomNum?: any;
  /**@param 营业时间结束时间 */
  operatingTimeEnd: string;
  /**@param 营业时间开始时间 */
  operatingTimeStart: string;
  /**@param 机构编码 */
  orgCode: string;
  /**@param 机构照片 */
  orgImg?: IImgDTO[];
  /**@param 机构名称 */
  orgName: string;
  /**@param 机构分类 */
  orgType: string;
  /**@param 机构分类全路径 */
  orgTypeFullName?: string;
  /**@param 客户到期提醒天数 */
  remainderDays: number;
  /**@param 机构简称 */
  shortName: string;
  /**@param 面积（平方米）*/
  squareMetre?: number;
  /**@param 最后修改时间 */
  updateTime: string;
}
