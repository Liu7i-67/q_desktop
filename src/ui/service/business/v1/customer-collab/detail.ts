export interface IReqBusinessV1CustomerCollabDetail {
  /** @param 客户id */
  customerId?: string;
  /** @param 协作数据id */
  dataId?: string;
}

export type TCollabType = "COLLABORATION" | "OFFICIAL";

export interface IResBusinessV1CustomerCollabDetail {
  /** @param 协作类型 COLLABORATION-协作合作 OFFICIAL-官方合作  */
  collabType?: TCollabType;
  /** @param 客户id */
  customerId?: string;
  dataId?: any;
  dataType?: string;
  id: string;
  /** @param 是否为主导者 */
  leaderFlag: boolean;
  /** @param 占比 */
  ratio: number;
  userId?: string;
  /** @param 协作人 */
  userName?: string;
}
