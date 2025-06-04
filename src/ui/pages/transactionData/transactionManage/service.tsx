import { Service } from "@/utils/Axios";

/**
 * @get_deal_page 分页查询客户成交信息
 */
export async function get_deal_page(params: {
  page?: number;
  size?: number;
  confirmTimeEnd?: string;
  confirmTimeStart?: string;
  createTimeEnd?: string;
  createTimeStart?: string;
  createUserIdList?: number[];
  customerId?: number;
  dataIdList?: number[];
  dealStatus?: string;
  orgIdList?: number[];
  pendingReviewFlag?: boolean;
  phoneNumber?: string;
  wechatNumber?: string;
}) {
  return Service.get("/api/business/v1/customer-deal/get-page", {
    params,
  });
}

/**
 * @get_deal_detail 查询客户成交详情
 */
export const get_deal_detail = (data: any) => {
  return Service.get(`/api/business/v1/customer-deal/${data.id}`);
};

/**
 * @confirm_deal 确认成交
 */
export const confirm_deal = (data: {
  confirmDate?: string;
  operateMemo?: string;
  id?: string;
}) => {
  return Service.post("/api/business/v1/customer-deal/confirm", { data });
};

/**
 * @cancel_deal 作废成交
 */
export const cancel_deal = (data: { operateMemo?: string; id?: string }) => {
  return Service.post("/api/business/v1/customer-deal/cancel", { data });
};

/**
 * @delete_deal 删除成交
 */
export const delete_deal = (data: { id: string }) => {
  return Service.delete("/api/business/v1/customer-deal/delete", {
    data: data.id,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * @export_deal 导出客户成交信息
 */
export const export_deal = (data: {
  confirmTimeEnd?: string;
  confirmTimeStart?: string;
  createTimeEnd?: string;
  createTimeStart?: string;
  createUserIdList?: number[];
  customerId?: number;
  dataIdList?: number[];
  dealStatus?: "UN_CONFIRMED" | "CONFIRMED" | "CANCELED";
  exportPostDTO?: {
    fileName?: string;
    sheetName?: string;
  };
  id?: number;
  orgIdList?: number[];
  pendingReviewFlag?: boolean;
  phoneNumber?: string;
  wechatNumber?: string;
}) => {
  return Service.post("/api/business/v1/customer-deal/export", { data });
};
