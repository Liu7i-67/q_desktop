export interface IPersonalCenterDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IPersonalCenterDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData?: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {}
