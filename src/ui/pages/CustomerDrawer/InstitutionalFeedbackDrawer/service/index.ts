import {
  IReqBusinessV1DispatchItemRecordGetPage,
  IResBusinessV1DispatchItemRecord,
} from "@/service/business/v1/dispatch-item-record/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 获取机构派单处理记录 */
export const get_dispatch_records = (
  params: IReqBusinessV1DispatchItemRecordGetPage
) => {
  return Service.get("/api/business/v1/dispatch-item-record/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1DispatchItemRecord>>;
};
