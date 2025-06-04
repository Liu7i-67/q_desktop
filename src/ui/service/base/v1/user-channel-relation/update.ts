export interface IReqBaseV1UserChannelRelationUpdate {
  /** @param 员工id*/
  userId: string;
  relationList: IRelationList[];
}

export interface IRelationList {
  /** @param 渠道id*/
  channelId: string;
  /** @param 渠道权重*/
  weight: string;
}
