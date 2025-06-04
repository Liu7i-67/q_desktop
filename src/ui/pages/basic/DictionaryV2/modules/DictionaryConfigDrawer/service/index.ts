import {
  IReqBaseV1SysDictValueDictValue,
  IResBaseV1SysDictValueDictValue,
} from "@/service/base/v1/sys-dict-value/dict-value";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**
 * @get_dict_value 获取字典值集合
 * @param params
 */
export const get_dict_value_page = (
  params: IReqBaseV1SysDictValueDictValue
) => {
  return Service.get("/api/base/v1/sys-dict-value/dict-value", {
    params,
  }) as Promise<IResDetail<IResBaseV1SysDictValueDictValue[]>>;
};
