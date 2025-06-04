import { ITreeItem } from "@/utils/interface";

export interface IUserPickerDrawerProps {
  /** @function 选择员工之后 */
  onSelect?: (record: ITreeItem) => void;
}

export interface IUserPickerDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  defaultUser?: ITreeItem;
}
