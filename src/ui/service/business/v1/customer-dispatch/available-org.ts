import { ImageFile } from "@/utils/upload";

export interface IReqBusinessV1CustomerDispatchAvailableOrg {
  customerId?: string;
  phoneNumber?: string;
  wechatNumber?: string;
}

export interface IResBusinessV1CustomerDispatchAvailableOrg {
  areaCode: string;
  areaName: string;
  center: string;
  childList: IResBusinessV1CustomerDispatchAvailableOrg[];
  cityCode: string;
  dataList: IResBusinessV1CustomerDispatchAvailableOrgDataItem[];
  id: string;
  level: number;
  parentCode: string;
}

export interface IResBusinessV1CustomerDispatchAvailableOrgDataItem {
  address: string;
  areaCode: string;
  areaName?: any;
  authCertificateImg: ImageFile[];
  businessLicenseImg: ImageFile[];
  businessLicenseNo?: any;
  businessScope?: (null | string)[];
  chainFlag: boolean;
  consultationRoomNum?: (null | number)[];
  contactName: string;
  contactPhone: string;
  cooperationStatus: string;
  createTime: string;
  departmentName?: (null | string)[];
  description: string;
  email: string;
  enableFlag: boolean;
  environmentImg: ImageFile[];
  establishYear: number;
  honorCertificateImg: ImageFile[];
  id: string;
  legalPerson: string;
  logoImg: ImageFile[];
  medicalLicenseImg: ImageFile[];
  medicalLicenseNo?: (null | string)[];
  memo: string;
  operatingDateEnd: string;
  operatingDateStart: string;
  operatingRoomNum?: (null | number)[];
  operatingTimeEnd: string;
  operatingTimeStart: string;
  orgCode: string;
  orgImg?: any;
  orgName: string;
  orgType: string;
  orgTypeFullName?: any;
  remainderDays: number;
  shortName: string;
  squareMetre?: (null | string)[];
  updateTime: string;
}
