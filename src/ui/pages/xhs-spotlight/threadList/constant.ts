/**@param 同步状态对象 */
export const syncStatusMap: Record<string, { text: string; color: string }> = {
  SYNCED_LEADS: { text: "已同步线索", color: "success" },
  SYNCED_CUSTOMER: { text: "已同步客户", color: "success" },
  ADVERTISER_NOT_EXIST: { text: "广告主不存在", color: "error" },
  CHANNEL_NOT_EXIST: { text: "渠道不存在", color: "error" },
  NO_SCHEDULE_CUSTOMER_SERVICE: { text: "无排班客服", color: "warning" },
  NO_LEADS: { text: "未留资", color: "default" },
  CUSTOMER_ALREADY_EXIST: { text: "客户已存在", color: "processing" },
  FAIL: { text: "同步失败", color: "error" },
  APPEND_CONTACT_INFORMATION: { text: "已追加联系方式", color: "success" },
  NO_OPERATION: { text: "无需操作", color: "default" },
};
