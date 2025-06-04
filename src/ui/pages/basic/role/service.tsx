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
 * @save_role 新增角色
 */
export const save_role = (data: any) => {
  return Service.post("/api/base/v1/sys-role/save", {
    data,
  });
};

/**
 * @update_role 修改角色
 */
export const update_role = (data: any) => {
  return Service.put("/api/base/v1/sys-role/update", {
    data,
  });
};

/**
 * @get_role_detail 获取角色详情
 */
export const get_role_detail = (data: any) => {
  return Service.get(`/api/base/v1/sys-role/${data.id}`);
};
