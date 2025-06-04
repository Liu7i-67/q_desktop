import { TCollabType } from "./detail";

export interface IReqBusinessV1CustomerCollabUpdate {
  /** @param 协作信息 */
  collabPostDTOList: IReqCollabPostDTO[];
  /** @param 客户id */
  customerId: string;
  /** @param 数据类型 */
  dataType: TDataType;
  /** @param 数据id */
  dataId: string;
}

export type TDataType = "CUSTOMER";

export interface IReqCollabPostDTO {
  /** @param 合作用户id */
  userId: string;
  /** @param 合作比例 */
  ratio: number;
  /** @param 合作类型 */
  collabType: TCollabType;
  /** @param 是否为主导者 */
  leaderFlag: boolean;
  id?: string;
}
