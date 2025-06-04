export interface IReqBusinessV1CustomerMerge {
  /** @param 合并客户的id*/
  mergedCustomerId: string;
  /** @param 保留合并客户的id*/
  retainCustomerId: string;
}
