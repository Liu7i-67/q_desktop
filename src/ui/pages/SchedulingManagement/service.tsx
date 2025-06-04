import { Service } from "@/utils/Axios";
import {
  IReqAddChannelGroup,
  IReqDeleteChannelGroup,
  IReqGetChannelGroup,
} from "./interface";

/** @function 新增渠道分组 */
export const add_channel_group = (data: IReqAddChannelGroup) => {
  return Service.post(`/api/base/v1/channel-group/save`, {
    data,
  });
};

/** @function 编辑渠道分组 */
export const update_channel_group = (data: Required<IReqAddChannelGroup>) => {
  return Service.put(`/api/base/v1/channel-group/update`, {
    data,
  });
};

/** @function 删除渠道分组 */
export const delete_channel_group = (data: IReqDeleteChannelGroup) => {
  return Service.delete(`/api/base/v1/channel-group/delete`, {
    data: data.groupIdList,
  });
};

/** @function 分页查询渠道分组 */
export const get_channel_group = (params: IReqGetChannelGroup) => {
  return Service.get(`/api/base/v1/channel-group/get-page`, {
    params,
  });
};
