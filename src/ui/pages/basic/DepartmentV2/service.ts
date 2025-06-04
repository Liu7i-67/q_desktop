import {
  IReqBaseV1SysDeptId,
  IResBaseV1SysDeptId,
} from "@/service/base/v1/sys-dept";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

export const get_department_detail = (data: IReqBaseV1SysDeptId) => {
  return Service.get(`/api/base/v1/sys-dept/${data.id}`) as Promise<
    IResDetail<IResBaseV1SysDeptId>
  >;
};
