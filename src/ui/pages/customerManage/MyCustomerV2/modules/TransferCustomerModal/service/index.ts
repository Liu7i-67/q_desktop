import { Service } from "@/utils/Axios";
import { IReqBusinessV1CustomerTransfer } from "@/service/business/v1/customer/transfer";
/**
 * @function 转移客户
 */
export const transfer_customer = (data: IReqBusinessV1CustomerTransfer) => {
  return Service.post("/api/business/v1/customer/transfer", {
    data,
  });
};
