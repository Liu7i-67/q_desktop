import {
  IReqBaseV1ChannelGetPage,
  IResBaseV1ChannelGetPage,
} from "@/service/base/v1/channel/get-page";
import { IResBaseV1SysUserdeptTreeAndUser } from "@/service/base/v1/sys-user/dept-tree-and-user";
import {
  IResBaseV1ChannelTree,
  IReqBaseV1ChannelTree,
} from "@/service/base/v1/channel/tree";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/** @function 获取渠道树 */
export const get_channel_tree = (params?: IReqBaseV1ChannelTree) => {
  return Service.get("/api/base/v1/channel/tree", {
    params,
  }) as Promise<IResDetail<IResBaseV1ChannelTree[]>>;
};

/** @function 查询渠道信息 */
export const channel_get_page = (params?: IReqBaseV1ChannelGetPage) => {
  return Service.get("/api/base/v1/channel/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1ChannelGetPage>>;
};
