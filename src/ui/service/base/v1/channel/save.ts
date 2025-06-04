export interface IReqBaseV1ChannelSave {
  /**@param 渠道名称 */
  channelName?: string;
  /**@param 渠道分类id */
  channelTypeId?: number;
  /**@param 启用状态 */
  enableFlag: boolean;
  /**@param 主键id */
  id: string;
  /**@param 渠道备注 */
  memo?: string;
}

export type TResBaseV1ChannelSave = boolean;
