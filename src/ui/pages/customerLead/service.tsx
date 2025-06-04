import { Service } from "@/utils/Axios";

export enum LeadsType {
  PLACE = "PLACE",
  ECOMMERCE = "ECOMMERCE",
}

export enum RefundStatus {
  UN_REFUNDED = "UN_REFUNDED",
  REFUNDED = "REFUNDED",
}

export const RefundStatusLabel = {
  [RefundStatus.UN_REFUNDED]: "未退款",
  [RefundStatus.REFUNDED]: "已退款",
};

/**
 * @get_region_tree 获取行政区划树
 * @param params
 */
export const get_region_tree = (params?: {
  /**
   * @maxLevel 最大要查到多少级
   */
  maxLevel?: number;
}) => {
  return Service.get("/api/base/v1/region/tree", {
    params,
  });
};

/**
 * @get_page 分页查询系统_客户线索
 * @param params
 */
export const get_page = (params: {
  /**
   * @areaCode 客户所在城市
   */
  areaCode?: string;
  /**
   * @assignTimeEnd 分配时间 - 结束时间
   */
  assignTimeEnd?: string;
  /**
   * @assignTimeStart 分配时间 - 开始时间
   */
  assignTimeStart?: string;
  /**
   * @channelId 渠道id
   */
  channelId?: number;
  /**
   * @createTimeEnd 创建时间 - 结束时间
   */
  createTimeEnd?: string;
  /**
   * @createTimeStart 创建时间 - 开始时间
   */
  createTimeStart?: string;
  /**
   * @customerName 客户姓名
   */
  customerName?: string;
  /**
   * @liveStreamerId 关联主播id
   */
  liveStreamerId?: number;
  /**
   * @phoneNumber 客户电话（线索电话）
   */
  phoneNumber?: string;
  /**
   * @platformId 平台id
   */
  platformId?: number;
  /**
   * @wechatNumber 微信号
   */
  wechatNumber?: string;
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size: number;
  /**
   * @refundStatus 退款状态 (UN_REFUNDED: 未退款, REFUNDED: 已退款)
   */
  refundStatus?: RefundStatus;
}) => {
  return Service.get("/api/business/v1/customer-leads/get-page", {
    params,
  });
};

/**
 * @get_channel_page 分页查询渠道
 * @param params
 */
export const get_channel_page = (params: {
  /**
   * @channelName 渠道名称
   */
  channelName?: string;
  /**
   * @channelTypeId 渠道分类id
   */
  channelTypeId?: number;
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size: number;
  /**
   * @enableFlag 启用状态
   */
  enableFlag: boolean;
}) => {
  return Service.get("/api/base/v1/channel/get-page", {
    params,
  });
};

/**
 * @get_platform_page 分页查询平台
 * @param params
 */
export const get_platform_page = (params: {
  /**
   * @platformName 平台名称
   */
  platformName?: string;
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size: number;
}) => {
  return Service.get("/api/base/v1/platform/get-page", {
    params,
  });
};

/**
 * @get_streamer_page 分页查询主播
 * @param params
 */
export const get_streamer_page = (params: {
  /**
   * @streamerName 主播名称
   */
  streamerName?: string;
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size: number;
}) => {
  return Service.get("/api/base/v1/live-streamer/get-page", {
    params,
  });
};

/**
 * @get_user_page 分页查询系统_员工
 * @param params
 */
export const get_user_page = (params: {
  /**
   * @deptIdList 所在部门集合
   */
  deptIdList?: number[];
  /**
   * @enableFlag 是否启用
   */
  enableFlag?: boolean;
  /**
   * @nickname 昵称
   */
  nickname?: string;
  /**
   * @numberOfCustomerAssignedTodayFlag 今日分配的客户数量
   */
  numberOfCustomerAssignedTodayFlag?: boolean;
  /**
   * @phoneNumber 手机号
   */
  phoneNumber?: string;
  /**
   * @userName 员工姓名
   */
  userName?: string;
  /**
   * @userType 员工类型
   */
  userType?:
    | "CUSTOMER_SERVICE"
    | "CONSULTANT"
    | "ORG"
    | "BUSINESS"
    | "ACCOUNTANT";
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size: number;
}) => {
  return Service.get("/api/base/v1/sys-user/get-page", {
    params,
  });
};

export interface IFileUploadResult {
  /**
   * @fileName 文件名称
   */
  fileName?: string;
  /**
   * @fullPath 文件完整路径
   */
  fullPath?: string;
  /**
   * @fullThumbnailPath 缩略图完整路径
   */
  fullThumbnailPath?: string;
  /**
   * @path 文件相对路径
   */
  path?: string;
  /**
   * @thumbnailPath 缩略图相对路径
   */
  thumbnailPath?: string;
}

export interface IDictionary {
  /**
   * @areaCode 客户所在城市
   */
  areaCode?: string;
  /**
   * @assignTimeEnd 分配时间 - 结束时间
   */
  assignTimeEnd?: string;
  /**
   * @assignTimeStart 分配时间 - 开始时间
   */
  assignTimeStart?: string;
  /**
   * @channelId 渠道id
   */
  channelId?: number;
  /**
   * @createTimeEnd 创建时间 - 结束时间
   */
  createTimeEnd?: string;
  /**
   * @createTimeStart 创建时间 - 开始时间
   */
  createTimeStart?: string;
  /**
   * @customerName 客户姓名
   */
  customerName?: string;
  /**
   * @liveStreamerId 关联主播id
   */
  liveStreamerId?: number;
  /**
   * @phoneNumber 客户电话（线索电话）
   */
  phoneNumber?: string;
  /**
   * @platformId 平台id
   */
  platformId?: number;
  /**
   * @wechatNumber 微信号
   */
  wechatNumber?: string;
  /**
   * @id 主键id
   */
  id?: number;
  /**
   * @memo 备注
   */
  memo: string;
  /**
   * @customerLabelValue 客户标签
   */
  customerLabelValue?: string;
  /**
   * @wechatQrCode 微信二维码
   */
  wechatQrCode?: IFileUploadResult;
  /**
   * @leadsType 线索类型 (PLACE: 场地, ECOMMERCE: 电商)
   */
  leadsType?: LeadsType;
  /**
   * @refundStatus 退款状态 (UN_REFUNDED: 未退款, REFUNDED: 已退款)
   */
  refundStatus?: RefundStatus;
}

/**
 * @save 新增系统_客户线索
 * @param data
 */
export const save = (data: IDictionary) => {
  return Service.post("/api/business/v1/customer-leads/save", { data });
};

/**
 * @update 修改系统_客户线索
 * @param data
 */
export const update = (data: IDictionary) => {
  return Service.put("/api/business/v1/customer-leads/update", { data });
};

/**
 * @batchDelete 批量删除系统_客户线索
 * @param data
 */
export const batchDelete = (data: {
  /**
   * @idList
   */
  idList: string[];
}) => {
  return Service.delete("/api/business/v1/customer-leads/delete", {
    data: data.idList,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * @get_customer_lead_details 获取客户线索详情
 * @param id 客户线索的 ID
 */
export const getCustomerLeadDetails = (data: { id: string }) => {
  return Service.get(`/api/business/v1/customer-leads/${data.id}`);
};

/**
 * @assign 分配客户线索（指派客户）
 * @param data
 */
export const assign = (data: {
  /**
   * @customerLeadsIdList 客户线索id列表
   */
  customerLeadsIdList: string[];
  /**
   * @userId 咨询师id
   */
  userId: string;
}) => {
  return Service.post("/api/business/v1/customer-leads/assign", { data });
};

/**
 * @get_repeat_user 查重客户电话/微信
 * @param params
 */
export const get_repeat_user = (params: { keyword: string }) => {
  return Service.get("/api/business/v1/customer/peek", {
    params,
  });
};
