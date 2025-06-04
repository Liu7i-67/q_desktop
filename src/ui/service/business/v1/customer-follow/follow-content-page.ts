export interface IReqBusinessV1CustomerFollowFollowContentPage {
  size: number;
  page: number;
  customerId: string;
}

export interface IResBusinessV1CustomerFollowFollowContentPage {
  createBy: string;
  createTime: string;
  createUserName: string;
  customerId: string;
  id: string;
  memo: string;
}
