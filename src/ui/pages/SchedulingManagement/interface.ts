export interface IReqAddChannelGroup {
  /** @param 渠道集合 */
  channelIdList: string[];
  /** @param 分组id */
  groupId?: string;
  groupName: string;
  memo: string;
}

export interface IReqGetChannelGroup {
  /** @param 分组名称 */
  groupName?: string;
  /** @param 页码 */
  page: number;
  /** @param 每页数量 */
  size: number;
}

export interface IReqDeleteChannelGroup {
  /** @param 分组id */
  groupIdList: string[];
}
