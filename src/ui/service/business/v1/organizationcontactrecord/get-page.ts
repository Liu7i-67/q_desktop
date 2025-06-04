export interface IReqBusinessV1OrganizationcontactrecordGetPage {
  customerId: string;
  page: number;
  size: number;
}

export interface IResBusinessV1OrganizationcontactrecordGetPage {
  contactTime: string;
  createTime: string;
  customerName: string;
  id: string;
  organizationId: string;
  organizationName: string;
  updateTime: string;
}
