import { ModalProps, Modal as AtdModal, ModalFuncProps } from "antd";
import { ModalFunc } from "antd/es/modal/confirm";

export const TXModal = function TXModal_(props: ModalProps) {
  return <AtdModal maskClosable={false} {...props}></AtdModal>;
};

type M = typeof AtdModal;

interface IModalType extends M {
  _info: ModalFunc;
  _success: ModalFunc;
  _error: ModalFunc;
  _warning: ModalFunc;
  _confirm: ModalFunc;
  _useModal: typeof AtdModal.useModal;
}

TXModal.info = (props: ModalFuncProps) => {
  return AtdModal.info({
    ...props,
    maskClosable: false,
  });
};

TXModal.success = (props: ModalFuncProps) => {
  return AtdModal.success({
    ...props,
    maskClosable: false,
  });
};

TXModal.error = (props: ModalFuncProps) => {
  return AtdModal.error({
    ...props,
    maskClosable: false,
  });
};

TXModal.warning = (props: ModalFuncProps) => {
  return AtdModal.warning({
    ...props,
    maskClosable: false,
  });
};

TXModal.confirm = (props: ModalFuncProps) => {
  return AtdModal.confirm({
    ...props,
    maskClosable: false,
  });
};

TXModal.useModal = AtdModal.useModal;

TXModal.config = AtdModal.config;
TXModal.destroyAll = AtdModal.destroyAll;

export { TXModal as Modal };
