import {
  IReqBaseV1SysDictValueSave,
  TResBaseV1SysDictValueSave,
} from "@/service/base/v1/sys-dict-value/save";
import {
  IReqBaseV1SysDictValueUpdate,
  TResBaseV1SysDictValueUpdate,
} from "@/service/base/v1/sys-dict-value/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";
/**
 * @save_dict_value 新增字典值
 * @param data
 */
export const save_dict_value = (data: IReqBaseV1SysDictValueSave) => {
  return Service.post("/api/base/v1/sys-dict-value/save", {
    data,
  }) as Promise<IResDetail<TResBaseV1SysDictValueSave>>;
};

/**
 * @update_dict_value 修改字典值
 * @param data
 */
export const update_dict_value = (data: IReqBaseV1SysDictValueUpdate) => {
  return Service.put("/api/base/v1/sys-dict-value/update", {
    data,
  }) as Promise<IResDetail<TResBaseV1SysDictValueUpdate>>;
};
