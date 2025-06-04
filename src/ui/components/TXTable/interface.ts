import { TableProps, TagProps } from "antd";
import { TTableKey } from "./tableKey";
import { ColumnType } from "antd/es/table";
import { AnyObject, LiteralUnion } from "antd/es/_util/type";
import { ITXTagStrsProps } from "../TXTableRender/TXTagStrs";
import { ITXTextCellProps } from "../TXTableRender/TXTextCell";
import { ITXListRowProps } from "../TXTableRender/TXListRow";
import { PresetColorKey } from "antd/es/theme/interface";
import { PresetStatusColorType, PresetColorType } from "antd/es/_util/colors";
import { ITXListByRowProps } from "../TXTableRender/TXListRow/Row";

export interface ITXTableProps<T> extends TableProps<T> {
  /** @param 表格配置项的唯一标识符 没有时不显示配置操作 */
  tableKey?: TTableKey;
  /** @param 列配置项 */
  columns: ITXColumnType<T>[];
  /** @param 每个配置项的span占比，默认为6展示4个 */
  columnSpan?: number;
}

export interface ITXColumnType<T = AnyObject> extends ColumnType<T> {
  /** @param 用于列表配置时过滤使用的title，不传则默认使用title */
  filterTitle?: string;
  /** @param 用户展示标题的解释 */
  toolTipTitle?: string;
  /** @param 排序使用 */
  index?: number;
  /** @param 数据类型 会覆盖render */
  dataType?: TDataType;
  /** @param 数据类型的额外配置 */
  dataExtraProps?: IDataExtraProps;
  /** @param 是否禁止配置 */
  disabledSetting?: boolean;
  /** @param 是否有可见权限 默认为true，传入false时不展示字段 */
  auth?: boolean;
}

export type TDataType =
  /** @param 常规文本 */
  | "text"
  /** @param 可能会是数组的字符串 */
  | "list"
  /** @param 多行文本需要换行展示 */
  | "textarea"
  /** @param 日期 YYYY-MM-DD */
  | "date"
  /** @param 时间 HH:mm:ss */
  | "time"
  /** @param 日期时间 YYYY-MM-DD HH:mm:ss */
  | "datetime"
  /** @param 地区编码 */
  | "areaCode"
  /** @param 单个标签 */
  | "tag"
  /** @param 图标标签 */
  | "iconTag"
  /** @param 徽标效果 */
  | "badge"
  /** @param 标签字符串 */
  | "tagStr"
  /** @param 百分比 */
  | "percent";

export interface IDataExtraProps {
  /** @param 标签字符串 */
  tagStr?: ITXTagStrsProps;
  /** @param 字符串 */
  text?: ITXTextCellProps;
  /** @param 多行文本 */
  textarea?: Partial<ITXListByRowProps>;
  /** @param 标签 */
  tag?: {
    options: {
      [key: string]: {
        color: LiteralUnion<PresetColorType | PresetStatusColorType>;
        text: string;
      };
    };
    props?: TagProps;
  };
  /** @param 图标标签 */
  iconTag?: {
    options: {
      [key: string]: {
        color: string;
        text: string;
        icon?: string;
      };
    };
    props?: TagProps;
  };
  /** @param 徽标 */
  badge?: {
    options: {
      [key: string]: {
        color: LiteralUnion<PresetColorKey>;
        text: string;
      };
    };
  };
  list?: ITXListRowProps;
}
