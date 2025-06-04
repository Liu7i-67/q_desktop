export interface IReqBaseV1UserChannelRelationGetPage {
  /**@param 分页current */
  page: number;
  /**@param 分页pageSize */
  size: number;
  /**@param 员工id */
  userId?: string;
}

export interface IResBaseV1UserChannelRelationGetPage {
  /** @param 员工渠道分组id*/
  channelId?: any;
  /** @param 员工渠道分组名称*/
  channelName?: any;
  /** @param 员工渠道分组名称*/
  channelNames: string;
  /** @param 员工id*/
  userId: string;
  /** @param 员工姓名*/
  userName: string;
  /** @param 渠道权重*/
  weight?: string;
}
