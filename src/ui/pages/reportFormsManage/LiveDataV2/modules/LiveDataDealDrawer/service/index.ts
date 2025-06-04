import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer,
  IResBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer,
} from "@/service/business/v1/live-streamer-customer/get-live-stream-deal-customer";
import { IResList } from "@/utils/interface";

/** @function  获取直播数据-成交明细分页*/
export const get_live_streamer_deal_customer = (
  data: IReqBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer
) => {
  return Service.post(
    "/api/business/v1/live-streamer-customer/get-live-stream-deal-customer",
    {
      data,
    }
  ) as Promise<
    IResList<IResBusinessV1LiveStreamerCustomerGetLiveStreamDealCustomer>
  >;
};
