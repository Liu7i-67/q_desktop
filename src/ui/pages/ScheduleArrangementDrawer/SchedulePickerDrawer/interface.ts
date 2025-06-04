import { IWeekViewRecord } from "../interface";

export interface ISchedulePickerDrawerProps {
  /** @function 选中数据 */
  onSelect?: (view: IWeekViewRecord) => void;
}

export interface ISchedulePickerDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  initData?: IWeekViewRecord;
}
