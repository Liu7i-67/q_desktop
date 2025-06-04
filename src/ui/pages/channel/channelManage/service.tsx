import { Service } from "@/utils/Axios";

/**
 * @get_channel_type_tree 获取渠道分类树
 */
export const get_channel_type_tree = () => {
  return Service.get("/api/base/v1/channel-type/tree");
};

/**
 * @save_channel_type 新增渠道分类
 */
export const save_channel_type = (data: any) => {
  return Service.post("/api/base/v1/channel-type/save", { data });
};

/**
 * @update_channel_type 修改渠道分类
 */
export const update_channel_type = (data: any) => {
  return Service.put("/api/base/v1/channel-type/update", {
    data,
  });
};

/**
 * @save_channel 新增渠道
 */
export const save_channel = (data: any) => {
  return Service.post("/api/base/v1/channel/save", {
    data,
  });
};

/**
 * @update_channel 修改渠道
 */
export const update_channel = (data: any) => {
  return Service.put("/api/base/v1/channel/update", {
    data,
  });
};

/**
 * @get_channel_detail 获取渠道详情
 */
export const get_channel_detail = (data: any) => {
  return Service.get(`/api/base/v1/channel/${data.id}`);
};
