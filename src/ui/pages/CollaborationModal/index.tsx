import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { ICollaborationModalProps, ICollaborationModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TableList } from "./modules/TableList";
import { Tips } from "./modules/Tips";

const CollaborationModal = observer(
  forwardRef<ICollaborationModalRef, ICollaborationModalProps>(
    function CollaborationModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title={"客户协作"}
          open={logic.open}
          width={680}
          destroyOnClose
          onOk={logic.submit}
          onCancel={logic.closeModal}
          okButtonProps={{
            loading: computed.loading,
          }}
        >
          <div>
            <Button
              className="mb-4"
              type="dashed"
              onClick={logic.handleAdd}
              loading={computed.loading}
              icon={<PlusOutlined />}
            >
              添加合作
            </Button>
            <Tips />
          </div>
          <TableList />
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<ICollaborationModalRef, ICollaborationModalProps>(
    function CollaborationModalPage(props, ref) {
      return (
        <Provider>
          <CollaborationModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
