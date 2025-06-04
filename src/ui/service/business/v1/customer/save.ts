import { IRepeatCustomerListDTO } from "./peek";

export interface IReqBusinessV1CustomerSave {
  /**@param 客户所在城市 */
  areaCode?: string;
  /**@param 渠道id */
  channelId?: number;
  /**@param 客户姓名 */
  customerName?: string;
  /**@param 客户类型,可用值:EMPTY,OLD_WITH_NEW,LEVEL_A,LEVEL_B,LEVEL_C,LEVEL_D,INVALID_CUSTOMER*/
  customerType?: string;
  /**@param 主键id */
  id?: string;
  /**@param 客户意向项目新增、修改通用DTO*/
  intentionalProjectPostDTOList?: IIntentionalProjectPostDTO[];
  /**@param 标签字典值集合*/
  labelValueList?: string[];
  /**@param 线索类型,可用值:PLACE,ECOMMERCE*/
  leadsType?: string;
  /**@param 主播id	 */
  liveStreamerId?: number;
  /**@param 客户备注 */
  memo?: string;
  /**@param 指派咨询师id */
  ownerUserId?: string;
  /**@param 客户电话 */
  phoneNumber?: string;
  /**@param 平台id */
  platformId?: number;
  /**@param 小红书redId*/
  redId?: string;
  /**@param 微信号 */
  wechatNumber?: string;
  /**@param 微信通过时间*/
  wechatPassTime?: string;
  /**@param 微信二维码 */
  wechatQrCode?: IWechatQrCodeDTO;
  /**@param 微信通过状态,可用值:UN_PASSED,PASSED,UN_DEFINED*/
  wechatStatus?: string;
  /**@param 线索来源：个人报备，线索分配,可用值:PERSONAL_REPORT,CLUE_ASSIGNMENT, CUSTOMER_ASSIGNED, PERSONAL_CREATED */
  createdSource: string;
}

export interface IResBusinessV1CustomerSave {
  /**@param 客户id */
  customerId: string;
  /**@param 错误信息 */
  errorMsg?: any;
  /**@param 已存在的客户id */
  existCustomerId?: any;
  /**@param 已存在的线索id */
  existLeadsId?: any;
  /**@param 线索id */
  leadsId?: any;
  /**@param 重复的电话或微信 */
  repeatPhoneOrWechat?: any;
  /** @param 客户重复列表 */
  repeatCustomerList: IRepeatCustomerListDTO[];
}

export interface IIntentionalProjectPostDTO {
  /**@param 数据id */
  dataId?: string;
  /**@param 数据类型,可用值:PROJECT,PROJECT_TYPE*/
  dataType?: string;
}

export interface IWechatQrCodeDTO {
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
