import { IObj } from "@/utils/interface";
import { FormProps } from "antd";
import { TFormKey } from "./formKey";

export interface ITXSearchFormProps extends FormProps {
  children?: React.ReactNode | React.ReactNode[];
  /** @param 请求状态 */
  loading?: boolean;
  /** @function 重置 */
  onReset?: () => void;
  /** @function 搜索 */
  onSearch?: (values: IObj) => void;
  /** @param 表单唯一标识符 */
  formKey?: TFormKey;
  /** @param 每个配置项的span占比，默认为6展示4个 */
  columnSpan?: number;
  /** @param 隐藏操作栏 */
  hideAction?: boolean;
}
