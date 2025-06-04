export interface IReqBusinessV1CustomerOperateLogGetPage {
  customerId: string;
  page?: number;
  size?: number;
}

export interface IResBusinessV1CustomerOperateLogGetPage {
  createBy: string;
  createTime: string;
  createUsername: string;
  customerId: string;
  id: string;
  operateMessage: string;
  operateType: TOperateType;
}

export type TOperateType = "COLLAB" | "DISPATCH" | "CUSTOMER_OWNER" | "NULL";

export const operateTypeInfo = {
  COLLAB: {
    text: "协作",
    color: "blue",
  },
  DISPATCH: {
    text: "派单",
    color: "green",
  },
  CUSTOMER_OWNER: {
    text: "客户负责人",
    color: "green",
  },
  NULL: {
    text: "-",
    color: "default",
  },
};
