import {
  IReqBusinessV1CampaignGetPage,
  IResBusinessV1CampaignGetPage,
} from "@/service/business/v1/campaign/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 分页查询广告计划 */
export const campaign_get_page = (params: IReqBusinessV1CampaignGetPage) => {
  return Service.get("/api/business/v1/campaign/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CampaignGetPage>>;
};
