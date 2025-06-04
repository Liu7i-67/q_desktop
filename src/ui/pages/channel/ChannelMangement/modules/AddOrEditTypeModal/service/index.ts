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

/**@function 新增渠道分类 */
export const save_channel_type = (data: IReqBaseV1ChannelSave) => {
  return Service.post("/api/base/v1/channel-type/save", {
    data,
  }) as Promise<IResDetail<TResBaseV1ChannelSave>>;
};

/**@function 修改渠道分类 */
export const update_channel_type = (data: IReqBaseV1ChannelUpdate) => {
  return Service.put("/api/base/v1/channel-type/update", {
    data,
  }) as Promise<IResDetail<TResBaseV1ChannelUpdate>>;
};
