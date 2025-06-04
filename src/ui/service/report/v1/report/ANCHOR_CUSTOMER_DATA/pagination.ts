export interface IReqReportV1ReportAnchorCustomerDataPagination {
  /**@param 开始时间 */
  startLocalDateTime?: string;
  /**@param 结束时间 */
  endLocalDateTime?: string;
  /**@param 主播id */
  liverStreamerIdList?: string[];
  /**@param 分页current */
  page?: number;
  /**@param 分页PageSize */
  size?: number;
}

export interface IResReportV1ReportAnchorCustomerDataPagination {
  /**@param 主播名称 */
  anchorName: string;
  /**@param 主播id */
  liveStreamerId: string;
  /**@param  成交人数*/
  numberOfPeopleDealt: string;
  /**@param 有效客资数*/
  numberOfValidCustomers: string;
  /**@param 成交金额*/
  totalAmountOfDeal: number;
  /**@param 总客户数*/
  totalNumberOfCustomers: string;
}
