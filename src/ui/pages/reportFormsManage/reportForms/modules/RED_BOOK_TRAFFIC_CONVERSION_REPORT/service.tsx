import { IReqReportV1ReportB0004Export } from "@/service/report/v1/report/B0004/export";
import { Service } from "@/utils/Axios";

/** @function 导出小红书流量转化报表 */
export const red_book_traffic_conversion_report = (
  data: IReqReportV1ReportB0004Export
) => {
  return Service.post(`/api/report/v1/report/B0004/export`, {
    data,
  });
};
