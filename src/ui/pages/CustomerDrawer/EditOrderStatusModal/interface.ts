import { IOption } from "@/utils/interface";

export interface IEditOrderStatusModalProps {
  onRefresh?: () => void;
}

export interface IShowData {
  dispatchStatus?: string;
  id: string;
  value?: IOption;
  /** @param 是否需要强制修改 */
  forceHandleFlag?: boolean;
}

export interface IEditOrderStatusModalRef {
  open: (initData: IShowData) => void;
  onCancel: () => void;
}
