import { IResBusinessV1CustomerDealGetPage } from "@/service/business/v1/customer-deal/get-page";
import { ITabPageProps } from "../interface";

export interface ITransactionRecordProps extends ITabPageProps {}

export interface ITransactionRecord extends IResBusinessV1CustomerDealGetPage {
  [key: string]: any;
}
