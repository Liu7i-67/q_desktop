export interface IReqBaseV1ChannelTree {
  /** @param 是否启用 */
  enableFlag?: boolean;
}

export interface IResBaseV1ChannelTree {
  channelChildList: IChannelChild[];
  channelTypeFullName?: any;
  childList: IResBaseV1ChannelTree[];
  id: string;
  memo: string;
  parentId?: any;
  typeName: string;
}

export interface IChannelChild {
  autoCreateCustomerFlag: boolean;
  channelName: string;
  channelTypeFullName?: any;
  channelTypeId: string;
  channelTypeName?: any;
  createTime: string;
  enableFlag: boolean;
  id: string;
  memo: string;
  tenantId: string;
  updateTime: string;
}
