import { IResBusinessV1TaskStartegyGetPage } from "@/service/business/v1/task-strategy/get-page";
import { ITabPageProps } from "../interface";
import { IResBusinessV1CustomerFollowFollowContentPage } from "@/service/business/v1/customer-follow/follow-content-page";
import { IResBusinessV1TaskStrategySuggestion } from "@/service/business/v1/task-strategy/suggestion-list";

export interface IFollowUpRecordLineProps extends ITabPageProps {}

export interface IFollowUpRecord
  extends IResBusinessV1CustomerFollowFollowContentPage {
  [key: string]: any;
}

export interface IGroupFollowUpRecord {
  year: string;
  list: [];
}

export interface ITaskSuggest extends IResBusinessV1TaskStrategySuggestion {}
