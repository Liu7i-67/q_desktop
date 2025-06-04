import { TReportDimension } from "@/utils/enum/modules/reportDimension";

export interface IReqReportV1ReportB0004Export {
  /** @param 渠道id */
  channelIds?: string[];
  /** @param 维度 */
  dimension: TReportDimension;
  /** @param 日期-开始 00:00:00 */
  startLocalDateTime: string;
  /** @param 日期-结束 23:59:59 */
  endLocalDateTime: string;
}
