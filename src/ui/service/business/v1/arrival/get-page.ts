export interface IReqBusinessV1ArrivalGetPage {
  customerId: string;
  page: number;
  size: number;
}

export interface IResBusinessV1ArrivalGetPage {
  arrivalTime: string;
  createTime?: any;
  customerId?: any;
  customerName?: any;
  dataId?: any;
  dataNames: string;
  groupId: string;
  id?: any;
  orgId: string;
  orgName: string;
  updateTime?: any;
}
