import { ITreeItem } from "@/utils/interface";
import { TreeProps, TreeSelectProps } from "antd";
import { TEmployeePicker } from "./useTXEmployeePicker";

export interface ITXEmployeePickerModalProps extends TreeProps {
  /** @param 展示类型 默认为客户所属人 */
  type?: TEmployeePicker;
  /** @function 确定后回填的参数 */
  onOk?: (ids: string[]) => void;
}

export interface ITXEmployeePickerProps extends TreeSelectProps {
  /** @param 展示类型 默认为客户所属人 */
  type?: TEmployeePicker;
  /** @param 单项类名 */
  itemClassName?: string;
}

export interface ITXDept extends ITreeItem {
  /** @param 是否为部门 */
  isDept?: boolean;
}

export interface IDept {
  /** @param 子集部门 */
  childList: IDept[];
  /**@param 创建时间 */
  createTime?: string;
  /**@param 部门名称全路径 */
  deptFullName?: string;
  /**@param 部门名称 */
  deptName?: string;
  /**@param 数据id */
  id?: string;
  /**@param 上级部门id */
  parentId?: string;
  /**@param 修改时间 */
  updateTime?: string;
  /**@param 用户列表 */
  userDTOList: IDeptEmployee[];
}

export interface IDeptEmployee {
  createTime: string;
  deptRelationDTOList: any[];
  enableFlag: boolean;
  id: string;
  lastLoginTime?: any;
  nickname: string;
  numberOfCustomerAssignedToday: number;
  orgId?: any;
  orgName?: any;
  phoneNumber: string;
  relationDeptIds: string[];
  relationDeptNames: string;
  relationRoleNames: string;
  roleRelationDTOList: any[];
  updateTime: string;
  userAccount: string;
  userName: string;
  userType: string;
}
