import {
  IReqBaseV1SysDeptSave,
  TReqBaseV1SysDeptSave,
} from "@/service/base/v1/sys-dept/save";
import {
  IReqBaseV1SysDeptUpdate,
  TReqBaseV1SysDeptUpdate,
} from "@/service/base/v1/sys-dept/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 新增部门分类 */
export const save_department_type = (data: IReqBaseV1SysDeptSave) => {
  return Service.post("/api/base/v1/sys-dept/save", { data }) as Promise<
    IResDetail<TReqBaseV1SysDeptSave>
  >;
};

/**@function 编辑部门分类 */
export const update_department_type = (data: IReqBaseV1SysDeptUpdate) => {
  return Service.put("/api/base/v1/sys-dept/update", {
    data,
  }) as Promise<IResDetail<TReqBaseV1SysDeptUpdate>>;
};
