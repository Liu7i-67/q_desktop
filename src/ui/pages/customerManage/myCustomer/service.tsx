import { Service } from "@/utils/Axios";

export enum CustomerStatus {
  EMPTY = "EMPTY",
  IN_PROGRESS = "IN_PROGRESS",
  DEAL = "DEAL",
  REPEAT_PURCHASE = "REPEAT_PURCHASE",
}
export enum CustomerStatusMap {
  EMPTY = "空",
  IN_PROGRESS = "开发中",
  DEAL = "成交",
  REPEAT_PURCHASE = "复购",
}

export enum WechatStatus {
  UN_PASSED = "UN_PASSED",
  PASSED = "PASSED",
  UN_DEFINED = "UN_DEFINED",
}

export enum CollabType {
  OFFICIAL = "OFFICIAL",
  COLLABORATION = "COLLABORATION",
}

export enum DataType {
  CUSTOMER = "CUSTOMER",
  DEAL = "DEAL",
}

export interface UpdateModalData {
  areaCode?: string;
  channelId?: number | null;
  collabUserName?: string;
  createTime?: string;
  customerLabelValue?: string | null;
  customerType?: string;
  customerLeadsDTO?: any | null;
  customerName?: string;
  customerStatus?: "EMPTY" | "IN_PROGRESS" | "DEAL" | "REPEAT_PURCHASE";
  id?: string;
  leadsId?: number | null;
  memo?: string | null;
  ownerName?: string;
  ownerUserId?: string;
  phoneNumber?: string[];
  updateTime?: string | null;
  wechatNumber?: string[];
  wechatStatus?: "UN_PASSED" | "PASSED" | "UN_DEFINED";
  intentionalProjectDTOList?: any[];
  labelRelationDTOList?: any[];
  userName?: string;
  collabDTOList?: any[];
  channelName?: string;
  platformName?: string;
}

/**
 * @get_repeat_user 查重客户电话/微信
 * @param params
 */
export const get_repeat_user = (params: { keyword: string }) => {
  return Service.get("/api/business/v1/customer/peek", {
    params,
  });
};

/**
 * @get_customer_page 分页查询客户信息
 * @param params
 */
export const get_customer_page = (data: {
  /**
   * @areaCode 客户所在城市
   */
  areaCode?: string;
  /**
   * @channelId 渠道id
   */
  channelId?: number;
  /**
   * @customerLabelValue 客户标签
   */
  customerLabelValue?: string;
  /**
   * @customerName 客户姓名
   */
  customerName?: string;
  /**
   * @customerStatus 客户状态
   */
  customerStatus?: CustomerStatus;
  /**
   * @leadsId 线索id
   */
  leadsId?: number;
  /**
   * @memo 客户备注
   */
  memo?: string;
  /**
   * @phoneNumber 客户电话
   */
  phoneNumber?: string;
  /**
   * @wechatNumber 微信号
   */
  wechatNumber?: string;
  /**
   * @wechatStatus 微信通过状态
   */
  wechatStatus?: WechatStatus;
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size?: number;
}) => {
  // 分页参数放 url， 其余放 body
  const requestData = { ...data };
  delete requestData["page"];
  delete requestData["size"];

  return Service.post(
    `/api/business/v1/customer/get-page/?page=${data.page}&size=${data.size}`,
    {
      data: requestData,
    }
  );
};

/**
 * @save 新增客户信息
 * @param data
 */
export const save = (data: {
  /**
   * @areaCode 客户所在城市
   */
  areaCode?: string;
  /**
   * @channelId 渠道id
   */
  channelId?: number;
  /**
   * @customerLabelValue 客户标签
   */
  customerLabelValue?: string;
  /**
   * @customerName 客户姓名
   */
  customerName?: string;
  /**
   * @id 主键id
   */
  id?: number;
  /**
   * @leadsId 线索id
   */
  leadsId?: number;
  /**
   * @memo 客户备注
   */
  memo?: string;
  /**
   * @phoneNumber 客户电话（线索电话）
   */
  phoneNumber?: string[];
  /**
   * @wechatNumber 微信号
   */
  wechatNumber?: string;
  /**
   * @wechatStatus 微信通过状态
   */
  wechatStatus?: WechatStatus;
}) => {
  return Service.post("/api/business/v1/customer/save", { data });
};

/**
 * @update 修改客户信息
 * @param data
 */
export const update = (data: {
  /**
   * @areaCode 客户所在城市
   */
  areaCode?: string;
  /**
   * @channelId 渠道id
   */
  channelId?: number;
  /**
   * @customerLabelValue 客户标签
   */
  customerLabelValue?: string;
  /**
   * @customerName 客户姓名
   */
  customerName?: string;
  /**
   * @id 主键id
   */
  id?: number;
  /**
   * @leadsId 线索id
   */
  leadsId?: number;
  /**
   * @memo 客户备注
   */
  memo?: string;
  /**
   * @phoneNumber 客户电话（线索电话）
   */
  phoneNumber?: string[];
  /**
   * @wechatNumber 微信号
   */
  wechatNumber?: string;
  /**
   * @wechatStatus 微信通过状态
   */
  wechatStatus?: WechatStatus;
  /**
   * 首次咨询项目
   */
  projectUuid?: string[];
}) => {
  return Service.put("/api/business/v1/customer/update", { data });
};

/**
 * @get_customer_detail 获取客户信息详情
 * @param id 客户ID
 */
export const get_customer_detail = (data: { id: string }) => {
  return Service.get(`/api/business/v1/customer/${data.id}`);
};

/**
 * @get_collab_detail 获取客户协作关系详情
 */
export const get_collab_detail = (params: {
  /**
   * @customerId 客户id
   */
  customerId?: number;
  /**
   * @dataId 协作数据id
   */
  dataId?: number;
}) => {
  return Service.get("/api/business/v1/customer-collab/detail", {
    params,
  });
};

/**
 * @update_collab 修改客户协作关系
 */
export const update_collab = (data: any) => {
  return Service.put("/api/business/v1/customer-collab/update", { data });
};

/**
 * @get_project_tree 获取项目分类树及子项目
 */
export const get_project_tree = () => {
  return Service.get("/api/base/v1/project-type/tree-and-child");
};

/**
 * @get_org_tree 获取行政区划及下属机构树
 */
export const get_org_tree = (params?: { maxLevel?: number }) => {
  return Service.get("/api/base/v1/region/tree-and-organization", {
    params,
  });
};

/**
 * @merge_customer 合并客户
 * @param data
 * @returns
 */
export const merge_customer = (data: {
  mergedCustomerId: number | string;
  retainCustomerId: number | string;
}) => {
  return Service.post("/api/business/v1/customer/merge", { data });
};

/**
 * @merge_customer 转移客户
 * @param data
 * @returns
 */
export const transtion_customer = (data: {
  /**
   * @areaCode 客户所在城市
   */
  areaCode?: string;
  /**
   * @channelId 渠道id
   */
  channelId?: number;
  /**
   * @customerLabelValue 客户标签
   */
  customerLabelValue?: string;
  /**
   * @customerName 客户姓名
   */
  customerName?: string;
  /**
   * @customerStatus 客户状态
   */
  customerStatus?: CustomerStatus;
  /**
   * @leadsId 线索id
   */
  leadsId?: number;
  /**
   * @memo 客户备注
   */
  memo?: string;
  /**
   * @phoneNumber 客户电话
   */
  phoneNumber?: string;
  /**
   * @wechatNumber 微信号
   */
  wechatNumber?: string;
  /**
   * @wechatStatus 微信通过状态
   */
  wechatStatus?: WechatStatus;
  /**
   * @targetCustomerIds 转移的客户id
   */
  targetCustomerIds: any[];
  /**
   * @transferUserId 转移给谁的id
   */
  transferUserId: number | string;
}) => {
  return Service.post("/api/business/v1/customer/transfer", { data });
};

/**
 * @get_project_type_tree 获取项目分类树
 */
export const get_project_type_tree = () => {
  return Service.get("/api/base/v1/project-type/tree");
};
