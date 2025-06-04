// 报表维度

import { configToOption } from "..";

// 原始定义
const config = {
  DATETIME: { label: "日期维度" },
  CHANNEL: { label: "渠道维度" },
  CHANNEL_MANAGER: { label: "渠道负责人维度" },

  // 这三个暂时不展示
  // CAMPAIGN_MANAGER: { label: "广告计划负责人维度", disabled: true },
  // CAMPAIGN: { label: "广告计划维度", disabled: true },
  // LEADS_SOURCE_TYPE: { label: "推广类型维度", disabled: true },

} as const;

// 类型
export type TReportDimension = keyof typeof config;

// 复选框数据源
export const reportDimensionOptions = configToOption<TReportDimension>(config);
