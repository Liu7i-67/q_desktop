export interface IReqBusinessV1CustomerTransfer {
  /** @param 接收转移客户人id*/
  transferUserId: string;
  /** @param 转移客户ids*/
  targetCustomerIds: string[];
}
