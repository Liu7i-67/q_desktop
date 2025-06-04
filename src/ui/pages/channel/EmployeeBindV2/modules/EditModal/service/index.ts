import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";
import { IResBaseV1UserChannelRelationGetPage } from "@/service/base/v1/user-channel-relation/getPage";
import { IReqBaseV1UserChannelRelationUpdate } from "@/service/base/v1/user-channel-relation/update";
/** @function 获取员工_渠道关联关系详情 */
export const get_user_channel_relation_detail = (userId: string) => {
  return Service.get(`/api/base/v1/user-channel-relation/${userId}`) as Promise<
    IResDetail<IResBaseV1UserChannelRelationGetPage[]>
  >;
};

/** @function 新增员工_渠道关联关系*/
export const save_user_channel_relation = (
  data: IReqBaseV1UserChannelRelationUpdate
) => {
  return Service.post("/api/base/v1/user-channel-relation/save", { data });
};

/** @function 修改员工_渠道关联关系*/
export const update_user_channel_relation = (
  data: IReqBaseV1UserChannelRelationUpdate
) => {
  return Service.put("/api/base/v1/user-channel-relation/update", { data });
};
