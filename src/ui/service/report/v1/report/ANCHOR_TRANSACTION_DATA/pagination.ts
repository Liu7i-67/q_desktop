export interface IReqReportV1ReportAnchorTransactionDataPagination {
  /**@param 开始时间 */
  startLocalDateTime: string;
  /**@param 结束时间 */
  endLocalDateTime: string;
  /**@param 主播id */
  liverStreamerIdList: string[];
  /**@param 分页current */
  page: number;
  /**@param 分页PageSize */
  size: number;
}

export interface IResReportV1ReportAnchorTransactionDataPagination {
  /**@param 主播名称 */
  anchorName: string;
  /**@param 主播id */
  liveStreamerId: string;
  /**@param  */
  numberOfPeopleDealt: string;
  /**@param */
  numberOfValidCustomers: string;
  /**@param */
  totalAmountOfDeal: number;
  /**@param */
  totalNumberOfCustomers: string;
  /**@param 平台id*/
  platformId: string;
}
