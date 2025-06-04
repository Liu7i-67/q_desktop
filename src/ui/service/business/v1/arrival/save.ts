import { IReqBusinessV1CustomerDispatchSaveItemPostDTO } from "../customer-dispatch/save";

export interface IReqBusinessV1ArrivalSave {
  /** @param 客户id */
  customerId: string;
  /** @param 到院时间 YYYY-MM-DD HH:mm:ss */
  arrivalTime: string;
  /** @param 到院项目 */
  itemDTOList: IReqBusinessV1CustomerDispatchSaveItemPostDTO[];
  /** @param 到院机构 */
  orgId: string;
}
