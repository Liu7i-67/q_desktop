import { Service } from "@/utils/Axios";

/**
 * @get_project_page 分页查询医美项目
 */
export const get_project_page = (params: any) => {
  return Service.get("/api/base/v1/project/get-page", {
    params,
  });
};

/**
 * @get_project_type_tree 获取项目分类树
 */
export const get_project_type_tree = () => {
  return Service.get("/api/base/v1/project-type/tree");
};

/**
 * @save_project_type 新增项目分类
 */
export const save_project_type = (data: any) => {
  return Service.post("/api/base/v1/project-type/save", { data });
};

/**
 * @update_project_type 修改项目分类
 */
export const update_project_type = (data: any) => {
  return Service.put("/api/base/v1/project-type/update", {
    data,
  });
};

/**
 * @save_channel 新增渠道
 */
export const save_project = (data: any) => {
  return Service.post("/api/base/v1/project/save", {
    data,
  });
};

/**
 * @update_project 修改项目
 */
export const update_project = (data: any) => {
  return Service.put("/api/base/v1/project/update", {
    data,
  });
};

/**
 * @get_project_detail 获取项目详情
 */
export const get_project_detail = (data: any) => {
  return Service.get(`/api/base/v1/project/${data.id}`);
};
