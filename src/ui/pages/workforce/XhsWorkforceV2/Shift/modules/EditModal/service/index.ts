import { Service } from "@/utils/Axios";
import { IReqBaseV1WorkingShiftUpdate } from "@/service/base/v1/working-shift/update";

/** @function 新增班次*/
export const save_shift = (data: IReqBaseV1WorkingShiftUpdate) => {
  return Service.post("/api/base/v1/working-shift/save", { data });
};

/** @function 修改班次*/
export const update_shift = (data: IReqBaseV1WorkingShiftUpdate) => {
  return Service.put("/api/base/v1/working-shift/update", { data });
};
