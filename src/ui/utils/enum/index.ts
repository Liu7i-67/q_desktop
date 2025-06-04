import { ITagRecord } from "../interface";

export interface IConfigInfo {
  /** @param 状态对应的中文 */
  label: string;
  /** @param 状态对应的颜色值 */
  color?: string;
  /** @param 状态对应的icon */
  icon?: string;
  /** @param 是否禁用 */
  disabled?: boolean
}

// 新类型：确保 color 必填，其他字段保持原样
export type TConfigColorInfo = Omit<IConfigInfo, "color"> & {
  color: string; // 覆盖原可选属性为必填
};

/** @function 获取复选框数据源 */
export const configToOption = <T extends string>(
  config: Record<T, IConfigInfo>
) => {
  return (Object.keys(config) as Array<T>).map((r) => {
    return {
      value: r,
      label: config[r].label,
      disabled: config[r].disabled
    };
  });
};

/** @function 获取值和中文的数据源 */
export const configToLabels = <T extends string>(
  config: Record<T, IConfigInfo>
) => {
  return Object.fromEntries(
    (Object.entries(config) as [T, IConfigInfo][]).map(([key, { label }]) => [
      key,
      label,
    ])
  ) as Record<T, string>;
};

/** @function 获取用于tag展示的数据源 */
export const configToTagObj = <T extends string>(
  config: Record<T, TConfigColorInfo>
) => {
  return Object.fromEntries(
    (Object.entries(config) as [T, TConfigColorInfo][]).map(
      ([key, { label, color, icon }]) => [key, { color, text: label, icon }]
    )
  ) as Record<T, ITagRecord>;
};

/** @function 获取全部的状态集合 */
export const configAll = <T extends string>(config: Record<T, IConfigInfo>) => {
  return Object.keys(config) as Array<T>;
};
