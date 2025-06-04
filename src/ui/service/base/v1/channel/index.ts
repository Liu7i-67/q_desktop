import { IManagerDTO } from "./get-page";

export interface IReqBaseV1ChannelId {
  /**@param 请求数据详情的数据项id */
  id: string;
}

export interface IResBaseV1ChannelId {
  /**@param 渠道名称 */
  channelName?: string;
  /**@param 渠道分类全路径 */
  channelTypeFullName?: string;
  /**@param 渠道分类id */
  channelTypeId?: string;
  /**@param 渠道分类名称 */
  channelTypeName?: string;
  /**@param 创建时间 */
  createTime?: string;
  /**@param 是否启用 */
  enableFlag?: boolean;
  /**@param 数据id */
  id?: string;
  /**@param 渠道备注 */
  memo?: string;
  /**@param 最后修改时间 */
  updateTime?: string;
  /** @param 渠道负责人 */
  managerDTOList?: IManagerDTO[];
}
