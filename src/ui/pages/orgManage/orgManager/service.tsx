import { Service } from "@/utils/Axios";

/**
 * @get_org_page 分页查询机构
 */
export const get_org_page = (params: any) => {
  return Service.get("/api/base/v1/organization/get-page", {
    params,
  });
};

/**
 * @get_org_type_tree 获取机构分类树
 */
export const get_org_type_tree = () => {
  return Service.get("/api/base/v1/organization-type/tree");
};

/**
 * @save_org_type 新增/修改机构分类
 */
export const save_org_type = (data: any) => {
  return Service.post("/api/base/v1/organization-type/save", { data });
};

/**
 * @update_org_type 修改机构分类
 */
export const update_org_type = (data: any) => {
  return Service.put("/api/base/v1/organization-type/update", {
    data,
  });
};

/**
 * @update_org_type 删除机构分类
 */
export const delete_org_type = (data: any) => {
  return Service.delete("/api/base/v1/organization-type/delete", {
    data: data.idList,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * @save_org 新增机构
 */
export const save_org = (data: any) => {
  return Service.post("/api/base/v1/organization/save", {
    data,
  });
};

/**
 * @update_org 修改机构
 */
export const update_org = (data: any) => {
  return Service.put("/api/base/v1/organization/update", {
    data,
  });
};

/**
 * @get_org_detail 获取机构详情
 */
export const get_org_detail = (data: any) => {
  return Service.get(`/api/base/v1/organization/${data.id}`);
};
