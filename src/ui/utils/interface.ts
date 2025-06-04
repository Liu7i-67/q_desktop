import { IApiData } from "./Axios";

export type TRecord = {
  [key: string]: any;
};

export interface IOption {
  label: string;
  value: string;
  [key: string]: any;
}

export interface ITabItem {
  key: string;
  label: string;
}

export interface IPagination {
  pageSize: number;
  current: number;
  total: number;
}

export interface ITreeItem {
  title: string;
  value: string;
  children?: ITreeItem[];
  /** @param 是否禁用 */
  disabled?: boolean;
  /** @param 是否可选择 */
  checkable?: boolean;
  [key: string]: any;
}

export interface IResList<T> extends IApiData {
  data: {
    /** @param 当前页面 */
    current: string;
    /** @param 总页码数 */
    pages: string;
    /** @param 数据列表 */
    records: T[];
    /** @param 总条数 */
    total: string;
    /** @param 每页显示条数 */
    size: string;
  };
}

export interface IResDetail<T> extends IApiData {
  data: T;
}

export interface IReqBasePage {
  page: number;
  size: number;
}

export interface IObj {
  [key: string]: any;
}

export type TAction =
  // 编辑
  | "EDIT"
  // 删除
  | "DELETE"
  // 留言
  | "MESSAGE"
  // 反馈
  | "FEEDBACK"
  // 成交
  | "DEAL"
  // 详情
  | "DETAIL"
  // 派单
  | "DISPATCH"
  // 历史
  | "HISTORY"
  // 留言历史
  | "MESSAGE_HISTORY"
  // 取消
  | "CANNEL"
  // 确认
  | "CONFIRM";

// json类型的描述
export type TJsonValue = number | string | boolean;

export interface IJsonChild {
  [key: string]: TJsonValue | TJsonValue[] | IJsonChild;
}

export type TJson = IJsonChild[] | IJsonChild;

export interface ISegmentedOption {
  /** @param 分段项的显示文本 */
  label: React.ReactNode;
  /** @param 分段项的值 */
  value: string;
  /** @param 分段项的显示图标 */
  icon?: React.ReactNode;
  /** @param 是否禁用 */
  disabled?: boolean;
  /** @param 自定义类名 */
  className?: string;
}

export interface ITagRecord {
  color: string;
  text: string;
  icon?: string;
}
