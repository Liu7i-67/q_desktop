import { Gutter } from "antd/es/grid/row";

export interface ITXDescriptionsProps {
  /** @param 详情配置 */
  items: ITXDescriptionItem[];
  /** @param 尺寸默认为 big */
  size?: "small" | "middle" | "big";
  /** @param 是否需要边框 默认为是 */
  border?: boolean;
  className?: string;
  /** @param 标题类名 */
  labelClassName?: string;
  gutter?: Gutter | [Gutter, Gutter];
}

export interface ITXDescriptionItem {
  /** @param 标题 */
  label: React.ReactNode;
  /** @param 内容 */
  children: React.ReactNode;
  /** @param 标题所占列数 默认3  24一行 */
  labelSpan?: number;
  /** @param 内容所占列数 默认5  24一行 */
  childrenSpan?: number;
}
