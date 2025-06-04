export interface IReqBusinessV1CustomerDispatchDispatchHistoryPage {
  page: number;
  size: number;
  /** @param 用户电话号码 string[] */
  phoneNumberList: string;
}

export interface IResBusinessV1CustomerDispatchDispatchHistoryRecord {
  /** @param 派单人 */
  createdUserName: string;
  /** @param 派单时间 */
  dispatchDate: string;
  /** @param 派单电话 */
  dispatchPhone: string;
  /** @param 派单状态 */
  dispatchStatus: TDispatchStatus;
  id: string;
  orgName: string;
}

export type TDispatchStatus = 0 | 1 | 9 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const dispatchStatuLabel = {
  0: "已派单",
  1: "重单",
  9: "不重单",
  2: "不上门",
  3: "到院",
  4: "不成交",
  5: "交定金",
  6: "初次成交",
  7: "跟进中",
  8: "复购成交",
};
