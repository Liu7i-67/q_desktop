import { IResBusinessV1CustomerPeek } from "./peek";

export interface IIntentionalProjectDTOList {
  /** @param 项目名字 */
  dataName?: string;
  /** @param 项目id */
  dataId: string;
  /** @param 项目类型 */
  dataType?: string;
}
export interface IReqBusinessV1CustomerUpdate {
  /** @param 客户ID*/
  id?: string;
  /** @param 客户姓名*/
  customerName?: string;
  /** @param 客户邮箱*/
  customerEmail?: string;
  /** @param 微信通过状态*/
  wechatStatus: string;
  /** @param 客户标签*/
  labelValueList?: string[];
  /** @param 客户类型*/
  customerType?: string;
  /** @param 客户微信*/
  wechatNumber?: string[];
  /** @param 客户电话*/
  phoneNumber?: string[];
  /** @param 首次咨询项目*/
  intentionalProjectPostDTOList?: IIntentionalProjectDTOList[];
  /** @param 备注*/
  memo?: string;
  /**@param 线索来源：个人报备，线索分配,可用值:PERSONAL_REPORT,CLUE_ASSIGNMENT, CUSTOMER_ASSIGNED, PERSONAL_CREATED */
  createdSource: string;
  /**@param 渠道来源 0投放1电商 */
  leadsType?: number;
  /**@param 渠道id */
  channelId?: string;
  /**@param 主播id */
  liveStreamerId?: string;
  /**@param 平台id */
  platformId?: string;
}

export interface IResBusinessV1CustomerUpdate
  extends IResBusinessV1CustomerPeek {}
