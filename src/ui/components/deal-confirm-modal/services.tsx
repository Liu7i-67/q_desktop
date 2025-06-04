// http://192.168.100.92:20011/api/business/v1/customer-deal/85133747548061712

import { Service } from "@/utils/Axios";
import {
  CollabPostDTO,
  DealItemPostDTO,
} from "@/components/deal-confirm-modal/types";

/**
 * @getCustDealInfo 获取成交信息
 */
export const getCustDealInfo = (params: { dealId: string }) => {
  return Service.get(`api/business/v1/customer-deal/${params.dealId}`);
};

/**
 * @confirm_deal 确认成交
 */
export const confirm_deal = (data: {
  confirmDate?: string;
  operateMemo?: string;
  id?: string;
}) => {
  return Service.post("/api/business/v1/customer-deal/confirm", { data });
};

/**
 * @cancel_deal 作废成交
 */
export const cancel_deal = (data: { operateMemo?: string; id?: string }) => {
  return Service.post("/api/business/v1/customer-deal/cancel", { data });
};

/**
 * @review 审查成交
 * @param data
 */
export const review = (data: {
  /**
   * @amount 成交金额
   */
  amount: number;
  /**
   * @collabPostDTOList 客户协作关系
   */
  collabPostDTOList?: CollabPostDTO[];
  /**
   * @confirmAmount 确认金额
   */
  confirmAmount?: number;
  /**
   * @confirmDate 确认日期
   */
  confirmDate?: string;
  /**
   * @confirmUserId 确认人id
   */
  confirmUserId?: number;
  /**
   * @customerId 客户id
   */
  customerId: number;
  /**
   * @dealDate 成交日期
   */
  dealDate: string;
  /**
   * @id 主键id
   */
  id: number;
  /**
   * @itemPostDTOList 客户成交子项信息
   */
  itemPostDTOList?: DealItemPostDTO[];
  /**
   * @memo 成交备注
   */
  memo?: string;
  /**
   * @operateMemo 处理备注
   */
  operateMemo?: string;
  /**
   * @orgId 成交机构
   */
  orgId: number;
}) => {
  return Service.post("/api/business/v1/customer-deal/review", { data });
};
