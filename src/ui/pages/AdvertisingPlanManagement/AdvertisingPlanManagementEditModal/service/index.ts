import { Service } from "@/utils/Axios";
import { IReqBusinessV1CampaignUpdate } from "@/service/business/v1/campaign/update";

/** @function 修改广告计划 */
export const campaign_update = (data: IReqBusinessV1CampaignUpdate) => {
  return Service.put("/api/business/v1/campaign/update", {
    data,
  });
};
