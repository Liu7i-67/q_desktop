import { IResBusinessV1OrganizationcontactrecordGetPage } from "@/service/business/v1/organizationcontactrecord/get-page";
import { ITabPageProps } from "../interface";

export interface IOrganizationRecordProps extends ITabPageProps {}

export interface IOrganizationRecord
  extends IResBusinessV1OrganizationcontactrecordGetPage {
  [key: string]: any;
}
