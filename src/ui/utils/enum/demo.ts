// 请勿修改本文件

import { configAll, configToLabels, configToOption, configToTagObj } from ".";

// 原始定义
const config = {
  SUCCESS: { label: "成功", color: "#000000", icon: "icon-bianji" },
  ERROR: { label: "失败", color: "#111111", icon: "icon-bianji1" },
  NONE: { label: "空", color: "#222222", icon: "icon-bianji2" },
} as const;

// 类型
export type TDemo = keyof typeof config;

// 值-中文映射
export const demoLabels = configToLabels(config);

// 复选框数据源
export const demoOptions = configToOption<TDemo>(config);

// 标签展示数据源
export const demoTagObj = configToTagObj(config);

// 全部的状态集合
const ALL_DEMO_KEYS = configAll(config);

// 除"SUCCESS"之外的其他类型
export const demoNoSuccess = ALL_DEMO_KEYS.filter((i) => i !== "SUCCESS");
