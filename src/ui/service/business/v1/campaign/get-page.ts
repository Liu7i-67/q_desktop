export interface IReqBusinessV1CampaignGetPage {
  /** @param 计划名称 */
  campaignName?: string;
  /** @paarm 所属渠道 string[] */
  channelIdList?: string;
  /** @param 创建时间-结束 */
  createTimeEnd?: string;
  /** @param 创建时间-开始 */
  createTimeStart?: string;
  /** @param 负责员工id string[] */
  userIdList?: string;
  page: number;
  size: number;
}

export interface IResBusinessV1CampaignGetPage {
  /** @param 计划名称 */
  campaignName: string;
  channelId: string;
  /** @param 所属渠道名称 */
  channelName: string;
  createBy: string;
  createTime: string;
  createUserName: string;
  id: string;
  updateTime: string;
  userId: string;
  /** @param 负责人 */
  userName: string;
}
