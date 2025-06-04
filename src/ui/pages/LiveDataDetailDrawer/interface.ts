import { IResReportV1ReportAnchorTransactionDataPagination } from "@/service/report/v1/report/ANCHOR_TRANSACTION_DATA/pagination";

export interface ILiveDataDetailDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface ILiveDataDetailDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  /** @param 主播id */
  id: string;
  startLocalDateTime: string;
  endLocalDateTime: string;
}

export interface ILiveDataDetailRecord
  extends IResReportV1ReportAnchorTransactionDataPagination {}
