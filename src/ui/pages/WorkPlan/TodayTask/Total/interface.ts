import { IResBusinessV1CustomerFollowPersonalFollowPage } from "@/service/business/v1/customer-follow/personal-follow-page";

export interface ITotalProps {
  visible: boolean;
}

export interface ITotal extends IResBusinessV1CustomerFollowPersonalFollowPage {
  [key: string]: any;
}
