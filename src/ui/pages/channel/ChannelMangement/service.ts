import {
  IReqBaseV1ChannelGetPage,
  IResBaseV1ChannelGetPage,
} from "@/service/base/v1/channel/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/**@function 分页查询渠道管理 */
export const get_channel_page = (params: IReqBaseV1ChannelGetPage) => {
  return Service.get("/api/base/v1/channel/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1ChannelGetPage>>;
};
