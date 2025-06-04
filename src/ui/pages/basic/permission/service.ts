import { Service } from "@/utils/Axios";

/**
 * @get_role_page 分页查询角色列表
 */
export const get_role_page = (params: any) => {
  return Service.get("/api/base/v1/sys-role/get-page", {
    params,
  });
};

/**
 * @get_user_page 分页查询系统_员工
 * @param params
 */
export const get_user_page = (params: {
  /**
   * @deptIdList 所在部门集合
   */
  deptIdList?: number[];
  /**
   * @enableFlag 是否启用
   */
  enableFlag?: boolean;
  /**
   * @nickname 昵称
   */
  nickname?: string;
  /**
   * @numberOfCustomerAssignedTodayFlag 今日分配的客户数量
   */
  numberOfCustomerAssignedTodayFlag?: boolean;
  /**
   * @phoneNumber 手机号
   */
  phoneNumber?: string;
  /**
   * @userName 员工姓名
   */
  userName?: string;
  /**
   * @userType 员工类型
   */
  userType?:
    | "CUSTOMER_SERVICE"
    | "CONSULTANT"
    | "ORG"
    | "BUSINESS"
    | "ACCOUNTANT";
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size: number;
}) => {
  return Service.get("/api/base/v1/sys-user/get-page", {
    params,
  });
};

/**
 * 获取目标对象的权限
 * @param params
 * @returns
 */
export const get_target_permission = (params: {
  /**
     * @targetEnum 权限的对象类型
     *      USER(0, "员工"),
            ROLE(1, "角色"),
     */
  targetEnum: string | number;
  /**
   * @targetId 对象的id
   */
  targetId: string | number;
}) => {
  return Service.get("/api/base/v1/sys-menu/target-permission", {
    params,
  });
};

/**
 * 设置权限
 * @param data
 * @returns
 */
export const set_permission = (data: any) => {
  return Service.post("/api/base/v1/sys-menu/set-permission", {
    data,
  });
};

/**
 * 获取权限菜单树
 * @param data
 * @returns
 */
export const get_menu_tree = () => {
  return Service.get("/api/base/v1/sys-menu/tree");
};
