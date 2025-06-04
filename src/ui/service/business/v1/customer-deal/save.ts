export interface IReqBusinessV1CustomerDealSave {
  /** @param 派单id */
  dispatchId?: string;
  /** @param 成交时间 YYYY-MM-DD */
  dealDate: string;
  /** @param 客户id */
  customerId: string;
  /** @param 成交项目 */
  itemPostDTOList: IReqItemPostDTO[];
  /** @param 总金额 */
  amount: number;
  /** @param 上报时间 YYYY-MM-DD HH:mm:ss */
  createTime?: string;
  /** @param 成交机构 */
  orgId: string;
  /** @param 成交备注 */
  memo?: string;
}

export interface IReqItemPostDTO {
  /** @param 项目 */
  dataId: string;
  /** @param 金额 */
  amount: number;
  /** @param 项目类型 */
  dataType: TDataType;
}

export type TDataType = "PROJECT";
