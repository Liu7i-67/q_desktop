import { Service } from "@/utils/Axios";

/**
 * @get_platform_page 分页查询平台列表
 */
export const get_platform_page = (params: any) => {
  return Service.get("/api/base/v1/platform/get-page", {
    params,
  });
};

/**
 * @save_platform 新增平台
 */
export const save_platform = (data: any) => {
  return Service.post("/api/base/v1/platform/save", {
    data,
  });
};

/**
 * @update_platform 修改平台
 */
export const update_platform = (data: any) => {
  return Service.put("/api/base/v1/platform/update", {
    data,
  });
};
