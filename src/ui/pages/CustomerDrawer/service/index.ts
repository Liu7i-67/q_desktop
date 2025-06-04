import { IReqBusinessV1ArrivalDelete } from "@/service/business/v1/arrival/delete";
import {
  IReqBusinessV1ArrivalGetPage,
  IResBusinessV1ArrivalGetPage,
} from "@/service/business/v1/arrival/get-page";
import {
  IReqBusinessV1Customer,
  IResBusinessV1Customer,
} from "@/service/business/v1/customer";
import { IReqBusinessV1CustomerDealDelete } from "@/service/business/v1/customer-deal/delete";
import {
  IReqBusinessV1CustomerDealGetPage,
  IResBusinessV1CustomerDealGetPage,
} from "@/service/business/v1/customer-deal/get-page";
import {
  IReqBusinessV1CustomerDispatchCustomerDispatchPage,
  IResBusinessV1CustomerDispatchCustomerDispatch,
} from "@/service/business/v1/customer-dispatch/customer-dispatch-page";
import { IReqBusinessV1CustomerDispatchDelete } from "@/service/business/v1/customer-dispatch/delete";
import {
  IReqBusinessV1CustomerFollowFollowContentPage,
  IResBusinessV1CustomerFollowFollowContentPage,
} from "@/service/business/v1/customer-follow/follow-content-page";
import {
  IReqBusinessV1CustomerFollowGetPage,
  IResBusinessV1CustomerFollowGetPage,
} from "@/service/business/v1/customer-follow/get-page";
import {
  IReqBusinessV1CustomerOperateLogGetPage,
  IResBusinessV1CustomerOperateLogGetPage,
} from "@/service/business/v1/customer-operate-log/get-page";
import { IReqBusinessV1OrganizationcontactrecordDelete } from "@/service/business/v1/organizationcontactrecord/delete";
import { IReqBusinessV1OrganizationcontactrecordGetPage } from "@/service/business/v1/organizationcontactrecord/get-page";
import {
  IReqBusinessV1TaskStrategySuggestionList,
  IResBusinessV1TaskStrategySuggestion,
} from "@/service/business/v1/task-strategy/suggestion-list";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/** @function 获取客户信息详情 */
export const get_customer_detail = (params: IReqBusinessV1Customer) => {
  return Service.get(`/api/business/v1/customer/${params.id}`) as Promise<
    IResDetail<IResBusinessV1Customer>
  >;
};

/** @function 分页获取客户派单信息 */
export const get_customer_dispatch_page = (
  params: IReqBusinessV1CustomerDispatchCustomerDispatchPage
) => {
  return Service.get(
    `/api/business/v1/customer-dispatch/customer-dispatch-page`,
    { params }
  ) as Promise<IResList<IResBusinessV1CustomerDispatchCustomerDispatch>>;
};

/** @function 删除派单记录 */
export const delete_dispatch_records = (
  data: IReqBusinessV1CustomerDispatchDelete
) => {
  return Service.delete("/api/business/v1/customer-dispatch/delete", {
    data: data.id,
  });
};

/** @function 分页查询客户成交信息 */
export const get_customer_deal_page = (
  params: IReqBusinessV1CustomerDealGetPage
) => {
  return Service.get("/api/business/v1/customer-deal/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CustomerDealGetPage>>;
};

/** @param 删除客户成交信息 */
export const delete_customer_deal = (
  data: IReqBusinessV1CustomerDealDelete
) => {
  return Service.delete("/api/business/v1/customer-deal/delete", {
    data: data.id.toString(),
  });
};

/** @param 分页查询客户跟进信息 */
export const get_customer_follow_page = (
  params: IReqBusinessV1CustomerFollowGetPage
) => {
  const { size, page, ...data } = params;
  return Service.post("/api/business/v1/customer-follow/get-page", {
    params: {
      page,
      size,
    },
    data,
  }) as Promise<IResList<IResBusinessV1CustomerFollowGetPage>>;
};

/** @param 分页查询客户跟进信息-时间轴 */
export const get_customer_follow_content_page = (
  params: IReqBusinessV1CustomerFollowFollowContentPage
) => {
  return Service.get("/api/business/v1/customer-follow/follow-content-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CustomerFollowFollowContentPage>>;
};

/** @function 分页查询客户操作记录 */
export const get_customer_operate_log_page = (
  params: IReqBusinessV1CustomerOperateLogGetPage
) => {
  return Service.get("/api/business/v1/customer-operate-log/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CustomerOperateLogGetPage>>;
};

/** @function 分页查询到院信息 */
export const get_arrival_page = (params: IReqBusinessV1ArrivalGetPage) => {
  return Service.get("/api/business/v1/arrival/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1ArrivalGetPage>>;
};

/** @function 批量删除到院信息 */
export const delete_arrival = (data: IReqBusinessV1ArrivalDelete) => {
  return Service.delete("/api/business/v1/arrival/delete", {
    data: data.idList,
  });
};

/** @function 分页查询机构联系记录 */
export const get_org_contact_record_page = (
  params: IReqBusinessV1OrganizationcontactrecordGetPage
) => {
  return Service.get("/api/business/v1/organizationcontactrecord/get-page", {
    params,
  });
};

/** @function 批量删除机构联系记录 */
export const delete_org_contact_record = (
  data: IReqBusinessV1OrganizationcontactrecordDelete
) => {
  return Service.delete("/api/business/v1/organizationcontactrecord/delete", {
    data: data.idList,
  });
};

/** @function 获取建议 */
export const task_strategy_suggestion_list = (
  params: IReqBusinessV1TaskStrategySuggestionList
) => {
  return Service.get("/api/business/v1/task-strategy/suggestion-list", {
    params,
  }) as Promise<IResDetail<IResBusinessV1TaskStrategySuggestion[]>>;
};
