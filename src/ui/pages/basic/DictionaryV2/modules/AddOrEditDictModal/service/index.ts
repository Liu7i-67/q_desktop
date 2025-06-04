import {
  IReqBaseV1SysDictSave,
  IResBaseV1SysDictSave,
} from "@/service/base/v1/sys-dict/save";
import {
  IReqBaseV1SysDictUpdate,
  IResBaseV1SysDictUpdate,
} from "@/service/base/v1/sys-dict/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 新增字典 */
export const save = (data: IReqBaseV1SysDictSave) => {
  return Service.post("/api/base/v1/sys-dict/save", {
    data,
  }) as Promise<IResDetail<IResBaseV1SysDictSave>>;
};

/**@function 编辑字典 */
export const update = (data: IReqBaseV1SysDictUpdate) => {
  return Service.put("/api/base/v1/sys-dict/update", {
    data,
  }) as Promise<IResDetail<IResBaseV1SysDictUpdate>>;
};
