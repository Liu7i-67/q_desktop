import { IOption } from "@/utils/interface";

export interface IGetWorkingShiftList {
  size: number;
  page: number;
  scheduleType?: "LITTLE_RED_BOOK";
}

export interface IResWorkingShift {
  createTime: string;
  endTime: string;
  frontendExtension: string;
  id: string;
  scheduleType: number;
  shiftName: string;
  startTime: string;
  updateTime: string;
}

export interface IReqGetWeekViewData {
  scheduleDate?: string;
  scheduleDateStart?: string;
  scheduleDateEnd?: string;
  scheduleType?: "LITTLE_RED_BOOK";
}

export interface IResChannelDTORecord {
  channelGroupId: string;
  channelGroupName: string;
  channelId: string;
  channelName: string;
  createTime: string;
  id: string;
  scheduleId: string;
  updateTime: string;
}
export interface IBaseChannelRecord {
  channelId: string;
  channelName: string;
}

export interface IBaseChannelDTORecord {
  channelDTOList: IBaseChannelRecord[];
  channelGroupId: string;
  channelGroupName: string;
}

export interface IResChannelRelationViewDTO {
  channelDTOList: IResChannelDTORecord[];
  channelGroupId: string;
  channelGroupName: string;
}

export interface IBaseWorkingShiftRecord {
  frontendExtension: string;
  /** @param 班次id */
  id: string;
  shiftName: string;
}
export interface IResWorkingShiftRecord {
  createTime: string;
  endTime: string;
  frontendExtension: string;
  id: string;
  scheduleType: number;
  shiftName: string;
  startTime: string;
  updateTime: string;
}

export interface IResScheduleRelationRecord {
  /** @param 渠道信息 */
  channelRelationViewDTOList: IResChannelRelationViewDTO[];
  /** @param 排班信息 */
  workingShiftDTO: IResWorkingShift;
}

export interface IBaseScheduleRelationDTO {
  /** @param 渠道信息 */
  channelRelationViewDTOList: IBaseChannelDTORecord[];
  /** @param 前端展示的渠道信息  */
  webChannel: IOption[];
  /** @param 班次信息 */
  workingShiftDTO: IBaseWorkingShiftRecord;
}

export interface IResWeekViewRecord {
  id: string;
  /** @param 排班时间 */
  scheduleDate: string;
  scheduleType?: any;
  shiftId?: any;
  shiftName?: any;
  timeSlot?: any;
  /** @param 用户id */
  userId: string;
  /** @param 用户名称 */
  userName: string;
  userNameList: any[];
  /** @param 排班信息 */
  scheduleRelationDTOList: IResScheduleRelationRecord[];
}

export interface IReqChannelRelationPostDTO {
  channelGroupId: string;
  channelIdList: string[];
}

export interface IReqScheduleRelationPostDTO {
  shiftId: string;
  channelRelationPostDTOList: IReqChannelRelationPostDTO[];
}

export interface IReqPostDTO {
  userId: string;
  scheduleDate: string;
  scheduleRelationPostDTOList: IReqScheduleRelationPostDTO[];
}

export interface IReqUpdateUserSchedule {
  scheduleDateEnd: string;
  scheduleDateStart: string;
  /** @param 排班类型 */
  scheduleType: "LITTLE_RED_BOOK";
  postDTOList: IReqPostDTO[];
}
