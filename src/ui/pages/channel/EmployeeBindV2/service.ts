import { Service } from "@/utils/Axios";
import {
  IReqBaseV1UserChannelRelationGetPage,
  IResBaseV1UserChannelRelationGetPage,
} from "@/service/base/v1/user-channel-relation/getPage";
import { IResList } from "@/utils/interface";

/** @function 分页查询员工_渠道关联关系*/
export const get_user_channel_relation_page = (
  params: IReqBaseV1UserChannelRelationGetPage
) => {
  return Service.get("/api/base/v1/user-channel-relation/getPage", {
    params,
  }) as Promise<IResList<IResBaseV1UserChannelRelationGetPage>>;
};

/** @function 删除员工_渠道关联关系*/
export const delete_user_channel_relation = (data: string[]) => {
  return Service.delete("/api/base/v1/user-channel-relation/delete", {
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
