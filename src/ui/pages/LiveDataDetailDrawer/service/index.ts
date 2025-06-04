import {
  IReqReportV1ReportAnchorTransactionDataPagination,
  IResReportV1ReportAnchorTransactionDataPagination,
} from "@/service/report/v1/report/ANCHOR_TRANSACTION_DATA/pagination";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 演示接口 */
// export const get_platform_data = (
//   data: {
//     startLocalDateTime: string;
//     endLocalDateTime: string;

//     liveStreamerId: string;
//   },
//   params: { page: number; size: number }
// ) => {
//   return Service.post("/api/report/v1/report/get-platform-data", {
//     data,
//     params,
//   });
// };

/** @function 获取主播详情数据 */
export const get_live_data = (
  data: IReqReportV1ReportAnchorTransactionDataPagination
) => {
  return Service.post(
    "/api/report/v1/report/ANCHOR_TRANSACTION_DATA/pagination",
    {
      data,
    }
  ) as Promise<IResList<IResReportV1ReportAnchorTransactionDataPagination>>;
};
