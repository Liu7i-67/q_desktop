export interface IReqBaseV1UserScheduleMonthView {
  /** @param 开始日期*/
  scheduleDateStart?: string;
  /** @param 结束日期*/
  scheduleDateEnd?: string;
  /** @param 日程类型*/
  scheduleType?: "LITTLE_RED_BOOK";
}

export interface IResBaseV1UserScheduleMonthView {
  id?: string;
  scheduleDate: string;
  scheduleRelationDTOList: string[];
  scheduleType?: string;
  shiftId?: string;
  shiftName?: string;
  timeSlot?: string;
  userId?: string;
  userName?: string;
  userNameList: string[];
}
