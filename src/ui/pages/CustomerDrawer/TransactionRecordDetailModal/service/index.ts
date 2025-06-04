import {
  IReqBusinessV1CustomerDeal,
  IResBusinessV1CustomerDeal,
} from "@/service/business/v1/customer-deal";
import { IReqBusinessV1CustomerDealCancel } from "@/service/business/v1/customer-deal/cancel";
import { IReqBusinessV1CustomerDealConfirm } from "@/service/business/v1/customer-deal/confirm";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @param 获取成交信息 */
export const get_customer_deal = (params: IReqBusinessV1CustomerDeal) => {
  return Service.get(`/api/business/v1/customer-deal/${params.id}`) as Promise<
    IResDetail<IResBusinessV1CustomerDeal>
  >;
};

/** @function 确认成交 */
export const customer_deal_confirm = (
  data: IReqBusinessV1CustomerDealConfirm
) => {
  return Service.post("/api/business/v1/customer-deal/confirm", { data });
};

/** @function 作废成交 */
export const cancel_deal_cancel = (data: IReqBusinessV1CustomerDealCancel) => {
  return Service.post("/api/business/v1/customer-deal/cancel", { data });
};
