import { Service } from "@/utils/Axios";

/** 小红书私信留资查询接口参数 */
interface XhsLeadsQueryParams {
  address?: string;
  campaignName?: string;
  channelIdList?: string[];
  leadsTagList?: string[];
  phoneNum?: string;
  redId?: string;
  timeEnd?: string;
  timeStart?: string;
  wechat?: string;
  fromSource?: number;
  page?: number;
  size?: number;
}

/**
 * @get_xhs_leads_page 分页查询小红书私信留资
 */
export const get_xhs_leads_page = (params: XhsLeadsQueryParams) => {
  return Service.get("/api/business/v1/little-red-book-leads-push/get-page", {
    params,
  });
};

/**
 * @export_xhs_leads 导出小红书私信留资
 */
export const export_xhs_leads = (data: XhsLeadsQueryParams) => {
  return Service.post("/api/business/v1/little-red-book-leads-push/export", {
    data,
  });
};
