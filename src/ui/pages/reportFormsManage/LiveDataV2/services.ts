import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";
import {
  IReqReportV1ReportAnchorCustomerDataPagination,
  IResReportV1ReportAnchorCustomerDataPagination,
} from "@/service/report/v1/report/ANCHOR_CUSTOMER_DATA/pagination";
import { IReqReportV1ReportAnchorTransactionDataExport } from "@/service/report/v1/report/ANCHOR_TRANSACTION_DATA/export";

/** @function 分页获取直播数据 */
export const getLiveData = (
  data: IReqReportV1ReportAnchorCustomerDataPagination
) => {
  return Service.post("/api/report/v1/report/ANCHOR_CUSTOMER_DATA/pagination", {
    data,
  }) as Promise<IResList<IResReportV1ReportAnchorCustomerDataPagination>>;
};

export const exportData = (
  data: IReqReportV1ReportAnchorTransactionDataExport
) => {
  return Service.post("/api/report/v1/report/ANCHOR_TRANSACTION_DATA/export", {
    data,
  });
};
