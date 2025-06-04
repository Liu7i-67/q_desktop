import { ImageFile } from "@/utils/upload";
import { TDispatchStatus } from "../customer-dispatch/customer-dispatch-page";

export interface IReqBusinessV1DispatchItemRecordGetPage {
  customerId?: string;
  dataType?: number;
  dispatchId?: string;
  dispatchItemId?: string;
  dispatchStatus?: TDispatchStatus;
  memo?: string;
  orgId?: number;
  page?: number;
  size?: number;
}

export interface IResBusinessV1DispatchItemRecord {
  createTime: string;
  customerId: string;
  dispatchId: string;
  dispatchItemId: string;
  dispatchStatus: TDispatchStatus;
  id: string;
  memo: string;
  operateImg: ImageFile[];
  orgId: string;
  updateTime: string;
}
