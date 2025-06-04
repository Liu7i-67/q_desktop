import { Key } from "react";

export interface IReqBaseV1OrganizationGetPage {
  /**@param 机构所在城市编码 */
  areaCode?: string;
  /**@param 合作状态,可用值:PAUSED,IN_PROGRESS  */
  cooperationStatus?: string;
  /**@param 禁用状态  */
  enableFlag?: boolean;
  /**@param 机构id */
  id?: any;
  /**@param 机构编码 */
  orgCode?: string;
  /**@param 机构名称 */
  orgName?: string;
  /**@param 机构分类 */
  orgType?: Key;
  /**@param 机构简称 */
  shortName?: string;
  /**@param */
  searchCount?: boolean;
  /**@param 分页current */
  page: number;
  /**@param 分页pageSize */
  size: number;
}

export interface IResBaseV1OrganizationGetPage {
  /**@param	详细地址 */
  address: string;
  /**@param	机构所在城市编码 */
  areaCode: string;
  /**@param	机构所在城市名称 */
  areaName: string;
  /**@param	认证证书图片 */
  authCertificateImg: IImgDTO[];
  /**@param	营业执照图片 */
  businessLicenseImg: IImgDTO[];
  /**@param	营业执照编号 */
  businessLicenseNo?: any;
  /**@param	营业范围 */
  businessScope?: any;
  /**@param	是否连锁机构 */
  chainFlag?: any;
  /**@param	咨询室数量 */
  consultationRoomNum?: any;
  /**@param	联系人姓名 */
  contactName: string;
  /**@param	联系人电话 */
  contactPhone: string;
  /**@param		合作状态,可用值:PAUSED,IN_PROGRESS */
  cooperationStatus: string;
  /**@param	创建时间 */
  createTime: string;
  /**@param	机构科室 */
  departmentName?: any;
  /**@param	机构描述 */
  description?: any;
  /**@param	机构邮箱地址 */
  email: string;
  /**@param	是否启用 */
  enableFlag: boolean;
  /**@param	机构环境图片 */
  environmentImg: IImgDTO[];
  /**@param	成立年份 */
  establishYear?: any;
  /**@param	荣誉证书图片 */
  honorCertificateImg: IImgDTO[];
  /**@param	数据id */
  id: string;
  /**@param	法人姓名 */
  legalPerson?: any;
  /**@param	logo图片 */
  logoImg: any[];
  /**@param	医疗许可证图片 */
  medicalLicenseImg: IImgDTO[];
  /**@param	医疗许可证编号 */
  medicalLicenseNo?: any;
  /**@param	机构备注 */
  memo: string;
  /**@param	营业日期结束日期 */
  operatingDateEnd?: any;
  /**@param	营业日期开始日期 */
  operatingDateStart?: any;
  /**@param	手术室数量 */
  operatingRoomNum?: any;
  /**@param	营业时间结束时间 */
  operatingTimeEnd?: any;
  /**@param	营业时间开始时间 */
  operatingTimeStart?: any;
  /**@param	机构编码 */
  orgCode: string;
  /**@param	机构照片 */
  orgImg?: any;
  /**@param	机构名称 */
  orgName: string;
  /**@param	机构分类 */
  orgType: string;
  /**@param	机构分类全路径 */
  orgTypeFullName: string;
  /**@param	客户到期提醒天数 */
  remainderDays: number;
  /**@param	机构简称 */
  shortName: string;
  /**@param	面积（平方米） */
  squareMetre?: any;
  /**@param	最后修改时间 */
  updateTime: string;
}

export interface IImgDTO {
  /**@param 文件名称 */
  fileName: string;
  /**@param 文件完整路径 */
  fullPath: string;
  /**@param 缩略图完整路径 */
  fullThumbnailPath: string;
  /**@param 文件相对路径 */
  path: string;
  /**@param 缩略图相对路径 */
  thumbnailPath: string;
}
