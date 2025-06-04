export interface IReqBaseV1SysUserTodayAssignCount {
  /** @param 门店 */
  tenantId: string;
  /** @param 最小接单值（包含) 默认为0 查询全部 */
  assignThreshold: 0;
  /** @param 接单时间-开始 */
  assignTimeStrat?: string;
  /** @param 接单时间-结束 */
  assignTimeEnd?: string;
  /** @param 咨询师 string[] */
  idList?: string;
  /** @param 用户类型 */
  userType?: "CONSULTANT";
  page: number;
  size: number;
}
