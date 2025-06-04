import { TReportDimension } from "@/utils/enum/modules/reportDimension";
import { Dayjs } from "dayjs";

export interface ISearchInfo {
  /** @param 日期 */
  localDateTime: [Dayjs, Dayjs];
  /** @param 报表维度 */
  dimension: TReportDimension;
  /** @param 渠道 */
  channelIds?: string[];
}
