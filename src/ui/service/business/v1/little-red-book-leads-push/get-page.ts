export interface IReqBusinessV1LittleRedBookLeadsPushGetPage {
  /** @param 计划名称*/
  campaignName?: string;
  /** @param 小红书来源*/
  littleRedBookLeadsSource?: string;
  /** @param 电话号码*/
  phoneNum?: string;
  /** @param 微信号*/
  wechat?: string;
  /** @param 用户ID*/
  redId?: string;
  /** @param 用户地址*/
  address?: string;
  /** @param 线索标签*/
  leadsTagList?: string;
  /** @param 私信接收人*/
  channelIdList?: string;
  /** @param 结束时间*/
  timeEnd?: string;
  /** @param 开始时间*/
  timeStart?: string;
  /** @param 页码*/
  page?: number;
  /** @param 每页条数*/
  size?: number;
}
export interface IResBusinessV1LittleRedBookLeadsPushGetPage {
  adAccount?: string;
  address?: string;
  advertiserId?: string;
  /** @param 用户地址*/
  area: string;
  autoRecognize?: string;
  campaignId: string;
  /** @param 需求*/
  campaignName: string;
  city: string;
  /** @param 实际推送时间*/
  createTime: string;
  creativityId?: string;
  creativityName?: string;
  /** @param 客户所属人*/
  customerOwnerUserName?: string;
  /** @param 计划名称*/
  demand?: string;
  extInfo?: string;
  id: string;
  infoStatus?: string;
  /** @param 线索创建时间*/
  leadsCreateTime?: string;
  /** @param 线索id*/
  leadsId?: string;
  /** @param 线索标签*/
  leadsTag: string;
  linkId?: string;
  linkName?: string;
  /** @param 来源类型*/
  littleRedBookLeadsSource: string;
  /** @param 素材*/
  materialName?: string;
  msgReceiveId?: string;
  /** @param 私信接收人*/
  msgReceiveName: string;
  /** @param 用户昵称*/
  nickName: string;
  /** @param 笔记链接*/
  noteLink: string;
  openTalk?: string;
  /** @param 小红书所属人*/
  ownerUserName?: string;
  /** @param 电话号码*/
  phoneNum: string;
  privateMessageId?: string;
  /** @param 小红书ID*/
  redId: string;
  remark?: string;
  source?: string;
  staffCity?: string;
  staffCountry?: string;
  staffLabels?: string;
  staffName?: string;
  staffProvince?: string;
  /** @param 同步状态*/
  syncStatus: ISyncStatus;
  /** @param 小红书首次留资时间*/
  time: string;
  type?: string;
  unitId?: string;
  unitName?: string;
  updateTime?: string;
  /** @param 微信通过状态*/
  weChatStatus?: string;
  /** @param 微信号*/
  wechat: string;
  wechatCopy?: string;
}

export type ISyncStatus =
  //已同步线索
  | "SYNCED_LEADS"
  //已同步客户
  | "SYNCED_CUSTOMER"
  //广告主不存在
  | "ADVERTISER_NOT_EXIST"
  //渠道不存在
  | "CHANNEL_NOT_EXIST"
  //无排期客服
  | "NO_SCHEDULE_CUSTOMER_SERVICE"
  //未留资
  | "NO_LEADS"
  //客户已存在
  | "CUSTOMER_ALREADY_EXIST"
  //同步失败
  | "FAIL"
  //已追加联系方式
  | "APPEND_CONTACT_INFORMATION"
  //无需操作
  | "NO_OPERATION";
