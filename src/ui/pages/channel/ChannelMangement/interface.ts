import { IResBaseV1ChannelGetPage } from "@/service/base/v1/channel/get-page";

export interface IChannelMangementProps {}

export interface IChannelMangement extends IResBaseV1ChannelGetPage {
  /** @param 负责人 */
  mangementUsers?: string[];
}
