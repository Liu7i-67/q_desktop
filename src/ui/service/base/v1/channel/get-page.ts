export interface IReqBaseV1ChannelGetPage {
  /**@param 渠道名称 */
  channelName?: string;
  /**@param 渠道分类id */
  channelTypeId?: string;
  /**@param 分页current */
  page?: number;
  /**@param 分页pageSize */
  size: number;
  /**@param 启用状态 */
  enableFlag?: boolean;
  /** @param 渠道负责人 string[] */
  managerUserIdList?: string;
}

export interface IResBaseV1ChannelGetPage {
  /**@param 渠道名称 */
  channelName: string;
  /**@param 渠道分类全路径 */
  channelTypeFullName: string;
  /**@param 渠道分类id */
  channelTypeId: string;
  /**@param 渠道分类名称 */
  channelTypeName?: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 是否启用 */
  enableFlag: boolean;
  /**@param 数据id */
  id: string;
  /**@param 渠道备注 */
  memo: string;
  /**@param 最后修改时间 */
  updateTime: string;
  /** @param 渠道负责人 */
  managerDTOList?: IManagerDTO[];
}

export interface IManagerDTO {
  channelId: string;
  createTime: string;
  id: string;
  updateTime: string;
  userId: string;
  userName: string;
}
