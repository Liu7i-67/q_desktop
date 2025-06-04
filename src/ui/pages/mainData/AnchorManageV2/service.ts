import { Service } from "@/utils/Axios";
import {
  IReqBaseV1LiveStreamerGetPage,
  IResBaseV1LiveStreamerGetPage,
} from "@/service/base/v1/live-streamer/get-page";
import { IResList } from "@/utils/interface";

/** @function 分页查询主播列表*/
export const get_anchor_page = (params: IReqBaseV1LiveStreamerGetPage) => {
  return Service.get("/api/base/v1/live-streamer/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1LiveStreamerGetPage>>;
};
