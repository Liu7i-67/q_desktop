export interface IDictionaryConfigDrawerProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IDictionaryConfigDrawerRef {
  /** @function 打开抽屉 */
  openDrawer: (initData: IInitData) => void;
  /** @function 关闭抽屉 */
  closeDrawer: () => void;
}

export interface IInitData {
  /**@字典编码 */
  dictCode: string;
  /**@param 字典名称 */
  dictName: string;
}
