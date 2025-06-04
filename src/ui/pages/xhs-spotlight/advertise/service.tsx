import { Service } from "@/utils/Axios";

/**
 * @get_xhs_leads_page 分页查询小红书广告主
 */
export const get_xhs_advertiser = (params: {
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 条数
   */
  size?: number;
  /**
   * @advertiserName 广告主名称
   */
  advertiserName?: string;
  /**
   * @phoneNumber 手机号
   */
  phoneNumber?: string;
}) => {
  return Service.get("/api/business/v1/little-red-book-advertiser/get-page", {
    params,
  });
};

/**
 * @update_specific_field 修改指定字段
 */
export const update_xhs_advertiser = (data: {
  /**
   * @advertiserName 广告主名称
   */
  advertiserName?: string;
  /**
   * @id 修改项id
   */
  id?: string;
  /**
   * @memo 备注
   */
  memo?: string;
  /**
   * @phoneNumber 手机号
   */
  phoneNumber?: string;
}) => {
  return Service.put("/api/business/v1/little-red-book-advertiser/update", {
    data,
  });
};

/**
 * @save_org_contact_record 新增机构联系记录
 */
export const save_xhs_advertiser = (data: {
  /**
   * @advertiserName 广告主名称
   */
  advertiserName?: string;
  /**
   * @id 默认0
   */
  id?: string;
  /**
   * @memo 备注
   */
  memo?: string;
  /**
   * @phoneNumber 手机号
   */
  phoneNumber?: string;
}) => {
  return Service.post("/api/business/v1/little-red-book-advertiser/save", {
    data,
  });
};

/**
 * @delete_arrival 批量删除广告主
 */
export const delete_advertiser = (data: { idList: Array<any> }) => {
  return Service.delete("/api/business/v1/little-red-book-advertiser/delete", {
    data: data.idList,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
