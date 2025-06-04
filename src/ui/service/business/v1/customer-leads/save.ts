export interface IReqBusinessV1CustomerLeadsSave {
  /**@param 客户所在城市 */
  areaCode?: string;
  /**@param 渠道id */
  channelId?: number;
  /**@param 客户姓名 */
  customerName?: string;
  /**@param 主播id	 */
  liveStreamerId?: number;
  /**@param 客户电话 */
  phoneNumber?: string;
  /**@param 平台id */
  platformId?: number;
  /**@param 微信号 */
  wechatNumber?: string;
  /**@param 备注 */
  memo?: string;
  /**@param 微信二维码 */
  wechatQrCode?: IFileUploadResult;
  /**@param 渠道来源类型 */
  leadsType?: TLeadsType;
  /**@param 指派咨询师id */
  ownerUserId?: string;
}

/**
 * UN_REFUNDED: 未退款
 * REFUNDED: 已退款
 */
export type TRefundStatus = "UN_REFUNDED" | "REFUNDED";

/**
 * PLACE：投放
 * ECOMMERCE：电商
 */
export type TLeadsType = "PLACE" | "ECOMMERCE";

export interface IFileUploadResult {
  /**@param 文件名称 */
  fileName?: string;
  /**@param 文件完整路径 */
  fullPath?: string;
  /**@param 缩略图完整路径 */
  fullThumbnailPath?: string;
  /**@param 文件相对路径 */
  path?: string;
  /**@param 缩略图相对路径 */
  thumbnailPath?: string;
}
