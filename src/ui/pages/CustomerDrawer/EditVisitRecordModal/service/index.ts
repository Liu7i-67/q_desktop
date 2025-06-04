import { IReqBusinessV1ArrivalSave } from "@/service/business/v1/arrival/save";
import { Service } from "@/utils/Axios";

/** @function 新增到院信息 */
export const save_arrival = (data: IReqBusinessV1ArrivalSave) => {
  return Service.post("/api/business/v1/arrival/save", {
    data,
  });
};
