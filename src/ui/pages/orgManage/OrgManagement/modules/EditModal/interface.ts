import { IResBaseV1OrganizationGetPage } from "@/service/base/v1/organization/get-page";
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
  /**@param table当前项数据 */
  record?: IResBaseV1OrganizationGetPage | null;
  /**@param 机构分类 */
  orgType?: string;
  /**@param 左侧分类树 */
  cityTree: TreeDataNode[];
}
