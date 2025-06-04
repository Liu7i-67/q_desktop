import { TDealStatus } from "./get-page";

export interface IReqBusinessV1CustomerDealExport {
  confirmTimeEnd?: string;
  confirmTimeStart?: string;
  createTimeEnd?: string;
  createTimeStart?: string;
  createUserIdList?: string;
  customerId?: string;
  dataIdList?: string[];
  dealStatus?: TDealStatus;
  exportPostDTO?: {
    fileName?: string;
    sheetName?: string;
  };
  id?: string;
  orgIdList?: string;
  pendingReviewFlag?: boolean;
  phoneNumber?: string;
  wechatNumber?: string;
}

export interface IResBusinessV1CustomerDealExport {
  exportAsync: boolean;
  fileDTO: IFileDTO;
  noDataFlag: boolean;
}

export interface IFileDTO {
  /**@param 文件名称 */
  fileName: string;
  /**@param 文件完整路径 */
  fullPath: string;
  /**@param 缩略图完整路径 */
  fullThumbnailPath: string;
  /**@param 文件相对路径 */
  path: string;
  /**@param 缩略图相对路径 */
  thumbnailPath: string;
}
