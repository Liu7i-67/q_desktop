import { TCustomerType } from "@/utils/enum/modules/customerType";
import { ImageFile } from "@/utils/upload";

export interface IReqBusinessV1Customer {
  /** @param 客户id */
  id: string;
}

export interface IResBusinessV1Customer {
  areaCode: string;
  channelId?: any;
  /** @param 来源渠道 */
  channelName?: string;
  /** @param 来源平台 */
  platformName?: string;
  collabDTOList: IResCollabDTO[];
  createBy: string;
  createTime: string;
  customerLeadsDTO: IResCustomerLeadsDTO;
  customerName: string;
  customerStatus: string;
  customerType: TCustomerType;
  id: string;
  /** @param 首次咨询项目 */
  intentionalProjectDTOList: IIntentionalProjectDTO[];
  labelRelationDTOList: any[];
  lastDispatchDTO?: any;
  lastFollow?: any;
  leadsId: string;
  memo: string;
  ownerName: string;
  ownerUserId: string;
  phoneNumber: string[];
  updateTime: string;
  wechatNumber: any[];
  wechatPassTime?: any;
  wechatStatus: TWechatStatus;
  wechatQrCode: IWechatQrCodeDTO;
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

export interface IIntentionalProjectDTO {
  customerId: string;
  dataId: string;
  dataName: string;
  dataType: string;
}

export type TWechatStatus = "UN_PASSED" | "PASSED" | "UN_DEFINED" | "PENDING";

export const wechatStatusInfo = {
  UN_PASSED: { label: "未通过", color: "rgb(249,57,32)" },
  PASSED: { label: "通过", color: "rgb(59,179,70)" },
  PENDING: { label: "待定", color: "blue" },
  UN_DEFINED: { label: "未定义", color: "default" },
};

export interface IResCollabDTO {
  collabType: string;
  customerId: string;
  dataId?: any;
  dataType: string;
  id: string;
  leaderFlag: boolean;
  ratio: number;
  userId: string;
  userName: string;
}

export interface IResCustomerLeadsDTO {
  areaCode: string;
  assignTime: string;
  assignUserId: string;
  assignUserName: string;
  channelId?: any;
  channelName?: any;
  createTime: string;
  customerId: string;
  customerName: string;
  id: string;
  leadsType: string;
  liveStreamerId: string;
  liveStreamerName: string;
  memo: string;
  phoneNumber: string;
  platformId: string;
  platformName: string;
  refundStatus: string;
  updateTime: string;
  wechatNumber: string;
  wechatQrCode?: ImageFile;
}
