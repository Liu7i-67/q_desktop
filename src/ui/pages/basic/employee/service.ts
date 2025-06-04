import { Service } from "@/utils/Axios";
import { EUserType } from "@/utils/user-helper/interface";

/**
 * @getPage 提交员工
 * @param params
 */
export const getComitUser = () => {
  return Service.get("/api/base/v1/sys-user/dept-tree-and-user");
};

/**
 * @getPage 分页查询员工
 * @param params
 */
export const getPage = (params: {
  deptIdList?: string[];
  enableFlag?: boolean;
  nickname?: string;
  phoneNumber?: string;
  userName?: string;
  userType?: EUserType;
  page: number;
  size: number;
}) => {
  return Service.get("/api/base/v1/sys-user/get-page", {
    params,
  });
};
/**
 * @getPage 查询树形员工
 */
export const getTreeUser = () => {
  return Service.get("/api/base/v1/sys-user/dept-tree-and-user");
};

/**
 * @deptTree 获取部门树
 */
export const deptTree = (params: { ignorePermission?: boolean }) => {
  return Service.get("/api/base/v1/sys-dept/tree", {
    params,
  });
};

/**
 * @saveEmployee 新增系统员工
 */
export const saveEmployee = (data: {
  deptList: {
    deptId: number;
    directorFlag?: boolean;
    userId?: number;
  }[];
  enableFlag: boolean;
  id?: number;
  nickname?: string;
  orgId?: number;
  phoneNumber: string;
  roleList: {
    roleId: number;
    userId?: number;
  }[];
  userAccount: string;
  userName: string;
  userType:
    | "CUSTOMER_SERVICE"
    | "CONSULTANT"
    | "ORG"
    | "BUSINESS"
    | "ACCOUNTANT";
}) => {
  return Service.post("/api/base/v1/sys-user/save", { data });
};

/**
 * @updateEmployee 修改系统员工
 */
export const updateEmployee = (data: {
  deptList: {
    deptId: number;
    directorFlag?: boolean;
    userId?: number;
  }[];
  enableFlag: boolean;
  id?: number;
  nickname?: string;
  orgId?: number;
  phoneNumber: string;
  roleList: {
    roleId: number;
    userId?: number;
  }[];
  userAccount: string;
  userName: string;
  userType:
    | "CUSTOMER_SERVICE"
    | "CONSULTANT"
    | "ORG"
    | "BUSINESS"
    | "ACCOUNTANT";
  ignorePermission: boolean;
}) => {
  return Service.put("/api/base/v1/sys-user/update", { data });
};

/**
 * @getEmployeeDetail 获取系统员工详情
 */
export const getEmployeeDetail = (data: any) => {
  return Service.get(`/api/base/v1/sys-user/${data.id}`);
};

/**
 * @resetPsw 重置密码
 * @param data
 */
export const resetPsw = (data: { id: string }) => {
  return Service.put("/api/base/v1/sys-user/reset-password", {
    headers: {
      "Content-Type": "application/json",
    },
    data: data.id,
  });
};
