import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1LiveStreamerCustomerGetLiveStreamCustomer,
  IResBusinessV1LiveStreamerCustomerGetLiveStreamCustomer,
} from "@/service/business/v1/live-streamer-customer/get-live-stream-customer";
import { IResList } from "@/utils/interface";

/** @function  获取直播数据-客户明细分页*/
export const get_live_streamer_customer = (
  data: IReqBusinessV1LiveStreamerCustomerGetLiveStreamCustomer
) => {
  return Service.post(
    "/api/business/v1/live-streamer-customer/get-live-stream-customer",
    {
      data,
    }
  ) as Promise<
    IResList<IResBusinessV1LiveStreamerCustomerGetLiveStreamCustomer>
  >;
};
