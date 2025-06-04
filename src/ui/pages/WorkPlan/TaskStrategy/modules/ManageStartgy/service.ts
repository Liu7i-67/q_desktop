import {
  IReqBusinessV1TaskStartegyDelete,
  IResBusinessV1TaskStartegyDelete,
} from "@/service/business/v1/task-strategy/delete";
import {
  IReqBusinessV1TaskStartegyGetPage,
  IResBusinessV1TaskStartegyGetPage,
} from "@/service/business/v1/task-strategy/get-page";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/** @function 分页查询任务策略基础信息 */
export const get_task_strategy_page = (
  params: IReqBusinessV1TaskStartegyGetPage
) => {
  return Service.get("/api/business/v1/task-strategy/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1TaskStartegyGetPage>>;
};

/** @function 删除任务策略 */
export const delete_task = (data: IReqBusinessV1TaskStartegyDelete) => {
  return Service.delete("/api/business/v1/task-strategy/delete", {
    data: data.idList,
    headers: {
      "Content-Type": "application/json",
    },
  }) as Promise<IResDetail<IResBusinessV1TaskStartegyDelete>>;
};
