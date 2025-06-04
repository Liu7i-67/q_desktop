export interface IReqBusinessV1DispatchMessageGetPage {
  /** @param 派单id */
  dispatchId?: string;
  /** @param 留言内容 */
  message?: string;
  page?: number;
  size?: number;
}

export interface IResBusinessV1DispatchMessageGetPage {
  createTime: string;
  dispatchItemId?: any;
  id: string;
  message: string;
  messageFrom: string;
  updateTime: string;
}
