import {
  IReqBaseV1ProjectId,
  IResBaseV1ProjectId,
} from "@/service/base/v1/project";
import {
  IReqBaseV1ProjectSave,
  TResBaseV1ProjectSave,
} from "@/service/base/v1/project/save";
import {
  IReqBaseV1ProjectUpdate,
  TResBaseV1ProjectUpdate,
} from "@/service/base/v1/project/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/** @function 获取项目详情 */
export const get_project_detail = (data: IReqBaseV1ProjectId) => {
  return Service.get(`/api/base/v1/project/${data.id}`) as Promise<
    IResDetail<IResBaseV1ProjectId>
  >;
};

/** @function 新增项目 */
export const save_project = (data: IReqBaseV1ProjectSave) => {
  return Service.post("/api/base/v1/project/save", {
    data,
  }) as Promise<IResDetail<TResBaseV1ProjectSave>>;
};

/** @function 修改项目 */
export const update_project = (data: IReqBaseV1ProjectUpdate) => {
  return Service.put("/api/base/v1/project/update", {
    data,
  }) as Promise<IResDetail<TResBaseV1ProjectUpdate>>;
};
