import { IReqBusinessV1CustomerDealDelete } from "@/service/business/v1/customer-deal/delete";
import {
  IReqBusinessV1CustomerDealExport,
  IResBusinessV1CustomerDealExport,
} from "@/service/business/v1/customer-deal/export";
import {
  IReqBusinessV1CustomerDealGetPage,
  IResBusinessV1CustomerDealGetPage,
} from "@/service/business/v1/customer-deal/get-page";
import {
  TReqBusinessV1CustomerDealUploadAndUpdate,
  TResBusinessV1CustomerDealUploadAndUpdate,
} from "@/service/business/v1/customer-deal/upload-and-update";
import { Service } from "@/utils/Axios";
import { IResDetail, IResList } from "@/utils/interface";

/**@function 分页查询客户成交信息 */
export async function get_deal_page(params: IReqBusinessV1CustomerDealGetPage) {
  return Service.get("/api/business/v1/customer-deal/get-page", {
    params,
  }) as Promise<IResList<IResBusinessV1CustomerDealGetPage>>;
}

/**@function 删除成交信息 */
export const delete_deal = (data: IReqBusinessV1CustomerDealDelete) => {
  return Service.delete("/api/business/v1/customer-deal/delete", {
    data: data.id,
    headers: {
      "Content-Type": "application/json",
    },
  }) as Promise<IResDetail<boolean>>;
};

/**@function 导出客户成交信息 */
export const export_deal = (data: IReqBusinessV1CustomerDealExport) => {
  return Service.post("/api/business/v1/customer-deal/export", {
    data,
  }) as Promise<IResDetail<IResBusinessV1CustomerDealExport>>;
};

/**@function 上传更新 */
export const upload = (data: TReqBusinessV1CustomerDealUploadAndUpdate) => {
  return Service.post("/api/business/v1/customer-deal/upload-and-update", {
    data,
  }) as Promise<IResDetail<TResBusinessV1CustomerDealUploadAndUpdate>>;
};
