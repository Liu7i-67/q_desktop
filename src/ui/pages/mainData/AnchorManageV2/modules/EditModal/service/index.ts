import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";
import { IResBaseV1LiveStreamerGetPage } from "@/service/base/v1/live-streamer/get-page";
import { IReqBaseV1LiveStreamerUpdate } from "@/service/base/v1/live-streamer/update";

/** @function 新增主播*/
export const save_anchor = (data: IReqBaseV1LiveStreamerUpdate) => {
  return Service.post("/api/base/v1/live-streamer/save", {
    data,
  });
};

/** @function 修改主播*/
export const update_anchor = (data: IReqBaseV1LiveStreamerUpdate) => {
  return Service.put("/api/base/v1/live-streamer/update", {
    data,
  });
};

/** @function 获取主播详情*/
export const get_anchor_detail = (id: string) => {
  return Service.get(`/api/base/v1/live-streamer/${id}`) as Promise<
    IResDetail<IResBaseV1LiveStreamerGetPage>
  >;
};
