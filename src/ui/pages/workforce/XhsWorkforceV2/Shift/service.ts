import {
  IReqBaseV1WorkingShiftGetList,
  IResBaseV1WorkingShiftGetList,
} from "@/service/base/v1/working-shift/get-list";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 分页查询班次*/
export const get_shift_page = (params: IReqBaseV1WorkingShiftGetList) => {
  return Service.get("/api/base/v1/working-shift/get-list", {
    params,
  }) as Promise<IResDetail<IResBaseV1WorkingShiftGetList[]>>;
};

/** @function 批量删除班次*/
export const delete_shift = (data: string[]) => {
  return Service.delete("/api/base/v1/working-shift/delete", {
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
