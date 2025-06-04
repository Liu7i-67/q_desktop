/**
 * @IPanelData 个人业绩仪表盘数据
 */
export interface IPanelData {
  /**
   * @gmvOfConfirm 当前确认业绩
   */
  gmvOfConfirm: number;
  /**
   * @gmvOfCreate 当期上报业绩
   */
  gmvOfCreate: number;
  /**
   * @numberOfBillingDeal 当期成交单量
   */
  numberOfBillingDeal: string;
  /**
   * @numberOfCurrentCustomer 当期客户数
   */
  numberOfCurrentCustomer: string;
  /**
   * @numberOfCurrentCustomerCollaborate 当期协作客户数
   */
  numberOfCurrentCustomerCollaborate: string;
  /**
   * @numberOfCurrentCustomerFollowFinish 当期已跟进客户数
   */
  numberOfCurrentCustomerFollowFinish: string;
  /**
   * @numberOfCurrentCustomerFollowFinish 当期无效客户数
   */
  numberOfCurrentCustomerInvalid: string;
  /**
   * @numberOfCurrentCustomerLeads 当期线索数
   */
  numberOfCurrentCustomerLeads: string;
  /**
   * @numberOfCurrentCustomerWaitFollow 当期待跟进客户数
   */
  numberOfCurrentCustomerWaitFollow: string;
  /**
   * @numberOfCurrentCustomerWechatPass 当期微信通过客户数
   */
  numberOfCurrentCustomerWechatPass: string;
  /**
   * @numberOfCustomerDispatch 当期派单人数
   */
  numberOfCustomerDispatch: string;
  /**
   * @statTimeEnd 统计结束时间
   */
  statTimeEnd: string | null;
  /**
   * @statTimeStart 统计开始时间
   */
  statTimeStart: string | null;
  /**
   * @timesOfCustomerDispatch 	当期派单人次
   */
  timesOfCustomerDispatch: string;
  /**
   * @totalNumberOfCustomer 	客户总数
   */
  totalNumberOfCustomer: string;
  /**
   * @totalNumberOfCustomerLeads 线索总数
   */
  totalNumberOfCustomerLeads: string;
  /**
   * @totalNumberOfCustomerWechatPass 微信通过客户总数
   */
  totalNumberOfCustomerWechatPass: string;
}

/**
 * @IDatasource 个人业绩明细表格数据源
 */
export interface IDatasource {
  /**
   * @collaborateRatio 合作比率(%)
   */
  collaborateRatio: number;
  /**
   * @createTime 提交时间
   */
  createTime: string;
  /**
   * @createTime 成交提交人
   */
  createUserName: string;
  /**
   * @dealAmount 成交金额
   */
  dealAmount: number;
  /**
   * @dealAmount 成交日期
   */
  dealDate: string;
  /**
   * @dealOrgName 成交机构
   */
  dealOrgName: string;
  /**
   * @dealProjectName 成交项目
   */
  dealProjectName: string;
  /**
   * @dealStatus 成交状态
   */
  dealStatus: string;
}
