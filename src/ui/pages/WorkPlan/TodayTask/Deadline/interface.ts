import { IResBusinessV1CustomerFollowPersonalFollowPage } from "@/service/business/v1/customer-follow/personal-follow-page";
export interface IDeadlineProps {
  visible: boolean;
  changeTab?: () => void;
}

export interface IDeadline
  extends IResBusinessV1CustomerFollowPersonalFollowPage {
  [key: string]: any;
}
