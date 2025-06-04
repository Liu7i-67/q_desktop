import { IChannelGrouping } from "../ChannelGrouping";

export interface IEditChannelGroupingModalProps {
  onSuccess?: () => void;
}

export interface IEditChannelGroupingModalInit {
  /** @param 老的数据 */
  old?: IChannelGrouping;
}

export interface IEditChannelGroupingModalRef {
  openModal: (iniData?: IEditChannelGroupingModalInit) => void;
  closeModal: () => void;
}
