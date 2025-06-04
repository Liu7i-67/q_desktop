import { TreeSelectProps } from "antd";

export interface ITXChannelPickerProps extends TreeSelectProps {
  /** @param 是否仅选取分类 */
  onlyDir?: boolean;
}
