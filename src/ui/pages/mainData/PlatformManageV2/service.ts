import { Service } from "@/utils/Axios";
import {
  IReqBaseV1PlatformGetPage,
  IResBaseV1PlatformGetPage,
} from "@/service/base/v1/platform/get-page";
import { IResList } from "@/utils/interface";

/** @function 分页查询平台列表*/
export const get_platform_page = (params: IReqBaseV1PlatformGetPage) => {
  return Service.get("/api/base/v1/platform/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1PlatformGetPage>>;
};
