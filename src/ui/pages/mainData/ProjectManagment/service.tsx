import {
  IReqBaseV1ProjectGetPage,
  IResBaseV1ProjectGetPage,
} from "@/service/base/v1/project/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 分页查询机构管理 */
export const get_project_page = (params: IReqBaseV1ProjectGetPage) => {
  return Service.get(`/api/base/v1/project/get-page`, {
    params,
  }) as Promise<IResList<IResBaseV1ProjectGetPage>>;
};
