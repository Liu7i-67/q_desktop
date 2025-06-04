import {
  IReqBusinessV1TaskStartegyIndex,
  IResBusinessV1TaskStartegyIndex,
} from "@/service/business/v1/task-strategy";
import {
  IReqBusinessV1TaskStartegySave,
  IResBusinessV1TaskStartegySave,
} from "@/service/business/v1/task-strategy/save";
import {
  IReqBusinessV1TaskStartegyUpdate,
  IResBusinessV1TaskStartegyUpdate,
} from "@/service/business/v1/task-strategy/update";
import { Service } from "@/utils/Axios";
import { IResDetail } from "@/utils/interface";

/**@function 新增任务策略 */
export const save_task_strategy = (data: IReqBusinessV1TaskStartegySave) => {
  return Service.post("/api/business/v1/task-strategy/save", {
    data,
  }) as Promise<IResDetail<IResBusinessV1TaskStartegySave>>;
};

/**@function 编辑任务策略 */
export const update_task_strategy = (
  data: IReqBusinessV1TaskStartegyUpdate
) => {
  return Service.post("/api/business/v1/task-strategy/update", {
    data,
  }) as Promise<IResDetail<IResBusinessV1TaskStartegyUpdate>>;
};

/** @function 任务策略信息详情信息 */
export const get_task_strategy_detail = (
  params: IReqBusinessV1TaskStartegyIndex
) => {
  return Service.get(`/api/business/v1/task-strategy/${params.id}`) as Promise<
    IResDetail<IResBusinessV1TaskStartegyIndex>
  >;
};
