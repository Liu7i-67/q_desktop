import {
  IReqBaseV1ChannelId,
  IResBaseV1ChannelId,
} from "@/service/base/v1/channel";
import {
  IReqBaseV1ChannelSave,
  TResBaseV1ChannelSave,
} from "@/service/base/v1/channel/save";
import {
  IReqBaseV1ChannelUpdate,
  TResBaseV1ChannelUpdate,
} from "@/service/base/v1/channel/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 获取渠道详情 */
export const get_channel_detail = (data: IReqBaseV1ChannelId) => {
  return Service.get(`/api/base/v1/channel/${data.id}`) as Promise<
    IResDetail<IResBaseV1ChannelId>
  >;
};

/**@function 新增渠道 */
export const save_channel = (data: IReqBaseV1ChannelSave) => {
  return Service.post("/api/base/v1/channel/save", {
    data,
  }) as Promise<IResDetail<TResBaseV1ChannelSave>>;
};

/**@function 修改渠道 */
export const update_channel = (data: IReqBaseV1ChannelUpdate) => {
  return Service.put("/api/base/v1/channel/update", {
    data,
  }) as Promise<IResDetail<TResBaseV1ChannelUpdate>>;
};
