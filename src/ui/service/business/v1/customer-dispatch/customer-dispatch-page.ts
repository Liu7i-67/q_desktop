export interface IReqBusinessV1CustomerDispatchCustomerDispatchPage {
  page: number;
  size: number;
  /** @param 客户id */
  customerId?: string;
  /** @param 客户电话 */
  phoneNumber?: string;
  /** @param 客户微信 */
  wechatNumber?: string;
}

export interface IResBusinessV1CustomerDispatchCustomerDispatch {
  areaCode?: string;
  createBy: string;
  createTime: string;
  createUserName?: any;
  customerId: string;
  dataName?: any;
  dataNames: string;
  dispatchDataIdList: string[];
  dispatchItemIdList: string[];
  dispatchStatus: string;
  historyDispatchInfoDTO?: any;
  id: string;
  memo: string;
  orgId: string;
  orgName: string;
  phoneNumber: string;
  tenantId: string;
  updateTime?: any;
  wechatNumber: string;
}

export type TDispatchStatus =
  | "CHECK_DUPLICATE_FAIL"
  | "DISPATCHED"
  | "REPEAT"
  | "NO_REPEAT"
  | "EMPTY";

export const dispatchStatusInfo = {
  DISPATCHED: { color: "success", text: "已派单" },
  REPEAT: { color: "warning", text: "重单" },
  NO_REPEAT: { color: "blue", text: "不重单" },
  EMPTY: { color: "default", text: "-" },
  CHECK_DUPLICATE_FAIL: { color: "red", text: "查重失败" },
};

export const dispatchStatusInfo2 = {
  DISPATCHED: { color: "green", text: "已派单" },
  REPEAT: { color: "orange", text: "重单" },
  NO_REPEAT: { color: "blue", text: "不重单" },
  EMPTY: { color: "default", text: "-" },
  CHECK_DUPLICATE_FAIL: { color: "red", text: "查重失败" },
};

export const dispatchStatusOptions = [
  {
    label: "已派单",
    value: "DISPATCHED",
  },
  {
    label: "重单",
    value: "REPEAT",
  },
  {
    label: "不重单",
    value: "NO_REPEAT",
  },
  {
    label: "查重失败",
    value: "CHECK_DUPLICATE_FAIL",
  },
];
