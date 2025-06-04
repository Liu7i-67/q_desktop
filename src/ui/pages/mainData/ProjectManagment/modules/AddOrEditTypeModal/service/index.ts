import {
  IReqBaseV1ProjectTypeSave,
  TResBaseV1ProjectTypeSave,
} from "@/service/base/v1/project-type/save";
import {
  IReqBaseV1ProjectTypeUpdate,
  TResBaseV1ProjectTypeUpdate,
} from "@/service/base/v1/project-type/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 新增机构分类 */
export const save_project_type = (data: IReqBaseV1ProjectTypeSave) => {
  return Service.post("/api/base/v1/project-type/save", {
    data,
  }) as Promise<IResDetail<TResBaseV1ProjectTypeSave>>;
};

/**@function 修改机构分类 */
export const update_project_type = (data: IReqBaseV1ProjectTypeUpdate) => {
  return Service.put("/api/base/v1/project-type/update", {
    data,
  }) as Promise<IResDetail<TResBaseV1ProjectTypeUpdate>>;
};
