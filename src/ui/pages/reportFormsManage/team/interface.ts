import { IPanelData as IPersonalPanelData } from "../personal/interface";

/**
 * @IPanelData 个人业绩仪表盘数据
 */
export interface IPanelData extends IPersonalPanelData {
  /**
   * @numberOfCurrentCustomerDeal 当期成交人数
   */
  numberOfCurrentCustomerDeal: string;
}

export interface IDealAmount {
  createDate: string;
  dealAmount: number;
}
