export interface IReqBusinessV1CustomerDispatchSave {
  /** @param 客户id */
  customerId: string;
  /** @param 派单的项目 */
  itemPostDTOList: IReqBusinessV1CustomerDispatchSaveItemPostDTO[];
  /** @param 派单电话 */
  phoneNumber: string;
  /** @param 派单机构 */
  orgIdList: string[];
  /** @param 派单备注 */
  memo: string;
}

export interface IReqBusinessV1CustomerDispatchSaveItemPostDTO {
  /** @param 项目的id */
  dataId: string;
  /** @param 项目的类型 */
  dataType: TDataType;
}

export type TDataType = "PROJECT";
