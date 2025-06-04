import { Service } from "@/utils/Axios";

/**
 * @get_anchor_page 分页查询主播列表
 */
export const get_anchor_page = (params: any) => {
  return Service.get("/api/base/v1/live-streamer/get-page", {
    params,
  });
};

/**
 * @save_anchor 新增主播
 */
export const save_anchor = (data: any) => {
  return Service.post("/api/base/v1/live-streamer/save", {
    data,
  });
};

/**
 * @update_anchor 修改主播
 */
export const update_anchor = (data: any) => {
  return Service.put("/api/base/v1/live-streamer/update", {
    data,
  });
};

/**
 * @get_anchor_detail 获取主播详情
 */
export const get_anchor_detail = (data: any) => {
  return Service.get(`/api/base/v1/live-streamer/${data.id}`);
};
