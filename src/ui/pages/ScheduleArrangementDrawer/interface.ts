import dayjs from "dayjs";
import { IResWeekViewRecord, IResWorkingShift } from "./service/interface";

export interface IScheduleArrangementDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IScheduleArrangementDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  /** @param 选中的时间 */
  date: dayjs.Dayjs;
}

export interface IWeekViewRecord extends IResWeekViewRecord {}

export interface IWorkingShift extends IResWorkingShift {}
