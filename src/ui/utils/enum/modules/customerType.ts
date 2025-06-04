// 客户类型

import { configToLabels, configToOption } from "..";

// 原始定义
const config = {
  EMPTY: { label: "无类型客户" },
  OLD_WITH_NEW: { label: "老带新" },
  LEVEL_A: { label: "A类顾客" },
  LEVEL_B: { label: "B类顾客" },
  LEVEL_C: { label: "C类顾客" },
  LEVEL_D: { label: "D类顾客" },
  INVALID_CUSTOMER: { label: "无效客户" },
} as const;

// 类型
export type TCustomerType = keyof typeof config;

// 复选框数据源
export const customerTypeOptions = configToOption<TCustomerType>(config);

// 值-中文映射
export const customerTypeLabels = configToLabels(config);
