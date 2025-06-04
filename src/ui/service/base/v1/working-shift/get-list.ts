export interface IReqBaseV1WorkingShiftGetList {
  /**@param 分页current */
  page?: number;
  /**@param 分页pageSize */
  size: number;
  /**@param 排班类型*/
  scheduleType: "LITTLE_RED_BOOK";
}

export interface IResBaseV1WorkingShiftGetList {
  createTime: string;
  endTime: string;
  frontendExtension: string;
  id: string;
  scheduleType: number;
  shiftName: string;
  startTime: string;
  updateTime: string;
}
