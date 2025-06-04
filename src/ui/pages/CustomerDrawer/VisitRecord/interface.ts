import { IResBusinessV1ArrivalGetPage } from "@/service/business/v1/arrival/get-page";
import { ITabPageProps } from "../interface";

export interface IVisitRecordProps extends ITabPageProps {}

export interface IVisitRecord extends IResBusinessV1ArrivalGetPage {
  [key: string]: any;
}
