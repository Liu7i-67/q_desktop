import { IResBaseV1SysDictValueDictValue } from "@/service/base/v1/sys-dict-value/dict-value";

export interface IAddOrEditDictionaryValueModalProps {
  /** @function 关闭之后 */
  afterClose?: () => void;
}

export interface IAddOrEditDictionaryValueModalRef {
  /** @function 打开弹窗 */
  openModal: (initData: IInitData) => void;
  /** @function 关闭弹窗 */
  closeModal: () => void;
}

export interface IInitData extends Partial<IResBaseV1SysDictValueDictValue> {}
