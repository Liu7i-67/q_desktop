import {
  IReqBusinessV1LittleRedBookLeadsPushGetPage,
  IResBusinessV1LittleRedBookLeadsPushGetPage,
} from "@/service/business/v1/little-red-book-leads-push/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 分页查询小红书私信留资*/
export const get_xhs_leads_page = (
  params: IReqBusinessV1LittleRedBookLeadsPushGetPage
) => {
  return Service.get("/api/business/v1/little-red-book-leads-push/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1LittleRedBookLeadsPushGetPage>>;
};

/** @function 导出小红书私信留资*/
export const export_xhs_leads = (
  data: IReqBusinessV1LittleRedBookLeadsPushGetPage
) => {
  return Service.post("/api/business/v1/little-red-book-leads-push/export", {
    data,
  });
};
