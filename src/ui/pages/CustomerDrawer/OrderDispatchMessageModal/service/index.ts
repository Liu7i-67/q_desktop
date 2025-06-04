import {
  IReqBusinessV1DispatchMessageGetPage,
  IResBusinessV1DispatchMessageGetPage,
} from "@/service/business/v1/dispatch-message/get-page";
import { IReqBusinessV1DispatchMessageSave } from "@/service/business/v1/dispatch-message/save";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 获取派单留言 */
export const get_dispatch_messages = (
  params: IReqBusinessV1DispatchMessageGetPage
) => {
  return Service.get("/api/business/v1/dispatch-message/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1DispatchMessageGetPage>>;
};

/**
 * @save_dispatch_message 新增派单留言
 */
export const save_dispatch_message = (
  data: IReqBusinessV1DispatchMessageSave
) => {
  return Service.post("/api/business/v1/dispatch-message/save", { data });
};
