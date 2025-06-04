// 用户类型

import { configAll, configToLabels, configToOption, configToTagObj } from "..";

// 原始定义
const config = {
  CONSULTANT: { label: "咨询师", color: "pink" },
  ACCOUNTANT: { label: "财务", color: "red" },
  BUSINESS: { label: "商务", color: "blue" },
  CUSTOMER_SERVICE: { label: "客服", color: "orange" },
  ORG: { label: "机构", color: "cyan" },
  TRAFFIC: { label: "流量", color: "purple" },
} as const;

// 类型
export type TUserType = keyof typeof config;

// 标签展示数据源
export const userTypeTagObj = configToTagObj(config);
