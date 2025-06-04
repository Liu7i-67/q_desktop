// 今日任务-任务状态
import { configAll, configToLabels, configToOption, configToTagObj } from "..";

// 原始定义
const config = {
  WAIT_START: { label: "待开始", color: "#0867E9", icon: "icon-daikaishi" },
  WAIT_COMPLETE: {
    label: "待完成",
    color: "#EC8100",
    icon: "icon-dengdaichaoshi",
  },
  COMPLETE: { label: "已完成", color: "#319E0F", icon: "icon-yiwancheng" },
  OVERTIME: { label: "已超时", color: "#EC002F", icon: "icon-tishi" },
} as const;

// 类型
export type TTodayTaskStatus = keyof typeof config;

// 复选框数据源
export const todayTaskOptions = configToOption<TTodayTaskStatus>(config);

// 标签展示数据源
export const todayTaskTagObj = configToTagObj(config);
