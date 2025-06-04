export interface IIntentionalProjectDTOList {
  /** @param 项目名字 */
  dataName?: string;
  /** @param 项目id */
  dataId: string;
  /** @param 项目类型 */
  dataType?: string;
}
export interface IReqBusinessV1CustomerUpdateFiled {
  /** @param 客户ID*/
  id?: string;
  /**@param 渠道来源 0投放1电商 */
  leadsType?: number;
  /**@param 渠道id */
  channelId?: string;
  /**@param 主播id */
  liveStreamerId?: string;
  /**@param 平台id */
  platformId?: string;
}

export type TResBusinessV1CustomerUpdateFiled = boolean;
