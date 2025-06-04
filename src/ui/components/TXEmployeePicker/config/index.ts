import { IObj, IResDetail } from "@/utils/interface";
import { ITXDept, ITXEmployeePickerProps } from "../interface";
import { TEmployeePicker } from "../useTXEmployeePicker";
import OWNER_OF_THE_CUSTOMER from "./OWNER_OF_THE_CUSTOMER";
import TASK_OWNER from "./TASK_OWNER";
import TASK_OWNER_CALENDAR from "./TASK_OWNER_CALENDAR";
import USER from "./USER";

export interface IConfig<T> {
  /** @function 数据请求方法 */
  api: (...rest: any) => Promise<IResDetail<T[]>>;
  /** @function 额外的请求参数 */
  extraParams?: IObj;
  /** @function 处理返回值的方法 */
  formatRes: (data: IResDetail<T[]>) => {
    list: ITXDept[];
    /** @paramm id和其他同名id的映射 */
    map: Map<string, string[]>;
    /** @param 组织和后代的映射 */
    orgMap: Map<string, string[]>;
    /** @param id和对象的映射 */
    infoMap?: Map<string, ITXDept>;
  };
  /** @param 额外的参数 */
  extraProps: ITXEmployeePickerProps;
}

export const getConfig = (
  /** @param 展示类型 默认为客户所属人 */
  type?: TEmployeePicker
) => {
  switch (type) {
    case "USER": {
      return USER
    }
    case "TASK_OWNER": {
      return TASK_OWNER;
    }
    case "TASK_OWNER_CALENDAR": {
      return TASK_OWNER_CALENDAR;
    }
  }
  return OWNER_OF_THE_CUSTOMER;
};
