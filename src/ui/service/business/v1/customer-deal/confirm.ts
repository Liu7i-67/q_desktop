export interface IReqBusinessV1CustomerDealConfirm {
  /** @param 成交金额 */
  confirmAmount: number;
  /** @param 成交备注 */
  operateMemo?: string;
  id?: string;
}
