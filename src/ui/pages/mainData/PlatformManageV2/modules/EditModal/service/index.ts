import { Service } from "@/utils/Axios";
import { IReqBaseV1PlatformUpdate } from "@/service/base/v1/platform/update";

/** @function 新增平台*/
export const save_platform = (data: IReqBaseV1PlatformUpdate) => {
  return Service.post("/api/base/v1/platform/save", {
    data,
  });
};

/** @function 修改平台*/
export const update_platform = (data: IReqBaseV1PlatformUpdate) => {
  return Service.put("/api/base/v1/platform/update", {
    data,
  });
};
