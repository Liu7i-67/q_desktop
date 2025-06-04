import { Service } from "@/utils/Axios";
import {
  IReqBusinessV1CustomerFollowFollowBoardStat,
  IResBusinessV1CustomerFollowFollowBoardStat,
} from "@/service/business/v1/customer-follow/follow-board-stat";
import { IResDetail, IResList } from "@/utils/interface";
import {
  IReqBusinessV1CustomerFollowFollowBoardStatList,
  IResBusinessV1CustomerFollowFollowBoardStatList,
} from "@/service/business/v1/customer-follow/follow-board-stat-list";

/** @function 任务看板-统计 */
export const customer_follow_board_stat = (
  data: IReqBusinessV1CustomerFollowFollowBoardStat
) => {
  return Service.post("/api/business/v1/customer-follow/follow-board-stat", {
    data,
  }) as Promise<IResDetail<IResBusinessV1CustomerFollowFollowBoardStat>>;
};

/** @function 任务看板-具体到人-部门的统计列表 */
export const customer_follow_board_stat_list = (
  params: IReqBusinessV1CustomerFollowFollowBoardStatList
) => {
  const { size, page, ...data } = params;
  return Service.post(
    "/api/business/v1/customer-follow/follow-board-stat-list",
    {
      params: {
        page,
        size,
      },
      data,
    }
  ) as Promise<IResList<IResBusinessV1CustomerFollowFollowBoardStatList>>;
};
