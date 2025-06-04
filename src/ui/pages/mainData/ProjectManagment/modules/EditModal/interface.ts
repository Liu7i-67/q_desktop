import { TreeDataNode } from "antd";

export interface IEditModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IEditModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData {
  /**@param table当前项数据id */
  recordId?: string;
  /**@param 医美项目分类 */
  typeId?: string;
  /**@param 左侧分类树 */
  tree: TreeDataNode[];
}
