import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  ITXFormItemSettingModalProps,
  ITXFormItemSettingModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { PickerContent } from "./modules/PickerContent";
import { Normal } from "./modules/Normal";
import { Title } from "./modules/Title";
import "./index.css";
import { AllKeyPicker } from "./modules/AllKeyPicker";
import { Footer } from "./modules/Footer";

const TXFormItemSettingModal = observer(
  forwardRef<ITXFormItemSettingModalRef, ITXFormItemSettingModalProps>(
    function TXFormItemSettingModal_(props, ref) {
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
          open={logic.open}
          width={1000}
          title={<Title />}
          onOk={logic.onSubmit}
          destroyOnClose
          onCancel={logic.closeModal}
          styles={{
            body: {
              height: "60vh",
              overflowX: "hidden",
            },
          }}
          confirmLoading={computed.loading}
          footer={(_, data) => <Footer {...data} />}
        >
          <div className="flex overflow-hidden h-full">
            <div className="flex-1 border-r pr-4 mr-4 overflow-y-auto overflow-x-hidden">
              <PickerContent />
              <AllKeyPicker />
            </div>
            <div className="w-[300px] select-none flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
              <Normal />
            </div>
          </div>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<ITXFormItemSettingModalRef, ITXFormItemSettingModalProps>(
    function TXFormItemSettingModalPage(props, ref) {
      return (
        <Provider>
          <TXFormItemSettingModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
