import { Service } from "@/utils/Axios";

/**
 * @get_department_type_tree 获取部门分类树
 */
export const get_department_type_tree = (params: {
  ignorePermission: boolean;
}) => {
  return Service.get("/api/base/v1/sys-dept/tree", {
    params,
  });
};

/**
 * @save_department_type 新增部门分类
 */
export const save_department_type = (data: any) => {
  return Service.post("/api/base/v1/sys-dept/save", { data });
};

/**
 * @update_department_type 修改部门分类
 */
export const update_department_type = (data: any) => {
  return Service.put("/api/base/v1/sys-dept/update", {
    data,
  });
};

/**
 * @get_department_detail 获取部门详情
 */
export const get_department_detail = (data: any) => {
  return Service.get(`/api/base/v1/sys-dept/${data.id}`);
};
