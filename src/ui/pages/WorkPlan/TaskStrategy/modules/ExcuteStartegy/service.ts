import {
  IReqBusinessV1TaskStartegyGetPage,
  IResBusinessV1TaskStartegyGetPage,
} from "@/service/business/v1/task-strategy/get-page";
import { Service } from "@/utils/Axios";
import { IResList } from "@/utils/interface";

/** @function 分页查询任务策略基础信息 */
export const get_task_strategy_page = (
  params: IReqBusinessV1TaskStartegyGetPage
) => {
  return Service.get("/api/business/v1/task-strategy/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1TaskStartegyGetPage>>;
};
