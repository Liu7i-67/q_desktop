export interface IChannelGroupingProps {}

export interface IChannelGrouping {
  /** @param 渠道列表 */
  channelDTOList: IChannelGrouping[];
  /** @param 渠道id */
  channelId: string;
  /** @param 渠道名称 */
  channelName: string;
  /** @param 创建时间 */
  createTime: string;
  /** @param 分组id */
  groupId: string;
  /** @param 分组名称 */
  groupName: string;
  /** @param 数据id */
  id: number;
  /** @param 备注 */
  memo: string;
  /** @param 更新时间 */
  updateTime: string;
}

export interface ITreeChannelGrouping extends IChannelGrouping {
  title: string;
  value: string;
  key: string;
  children: ITreeChannelGrouping[];
}
