import { IResBusinessV1CustomerOperateLogGetPage } from "@/service/business/v1/customer-operate-log/get-page";
import { ITabPageProps } from "../interface";

export interface ICustomerRecordProps extends ITabPageProps {}

export interface ICustomerRecord
  extends IResBusinessV1CustomerOperateLogGetPage {
  [key: string]: any;
}
