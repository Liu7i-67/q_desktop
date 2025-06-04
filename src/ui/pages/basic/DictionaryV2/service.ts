import {
  IReqBaseV1SysDictDelete,
  IResBaseV1SysDictDelete,
} from "@/service/base/v1/sys-dict/delete";
import {
  IReqBaseV1SysDictGetPage,
  IResBaseV1SysDictGetPage,
} from "@/service/base/v1/sys-dict/get-page";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/**
 * @get_page 分页查询系统_字典
 * @param params
 */
export const get_dictionary_page = (params: IReqBaseV1SysDictGetPage) => {
  return Service.get("/api/base/v1/sys-dict/get-page", {
    params,
  }) as Promise<IResList<IResBaseV1SysDictGetPage>>;
};

/**@function 批量删除字典 */
export const batch_delete = (data: IReqBaseV1SysDictDelete) => {
  return Service.put("/api/base/v1/sys-dict/delete", {
    data,
  }) as Promise<IResDetail<IResBaseV1SysDictDelete>>;
};
