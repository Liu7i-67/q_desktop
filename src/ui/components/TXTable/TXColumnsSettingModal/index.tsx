import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  ITXColumnsSettingModalProps,
  ITXColumnsSettingModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { PickerContent } from "./modules/PickerContent";
import { LeftFixed } from "./modules/LeftFixed";
import { Normal } from "./modules/Normal";
import { RightFixed } from "./modules/RightFixed";
import { Title } from "./modules/Title";
import "./index.css";
import { TableSize } from "./modules/TableSize";
import { AllKeyPicker } from "./modules/AllKeyPicker";
import { Footer } from "./modules/Footer";
import { FixedY } from "./modules/FixedY";

const TXColumnsSettingModal = observer(
  forwardRef<ITXColumnsSettingModalRef, ITXColumnsSettingModalProps>(
    function TXColumnsSettingModal_(props, ref) {
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
              <div className="flex gap-6">
                <TableSize />
                <FixedY />
              </div>
              <PickerContent />
              <AllKeyPicker />
            </div>

            <div className="w-[300px] select-none flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
              <LeftFixed />
              <Normal />
              <RightFixed />
            </div>
          </div>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<ITXColumnsSettingModalRef, ITXColumnsSettingModalProps>(
    function TXColumnsSettingModalPage(props, ref) {
      return (
        <Provider>
          <TXColumnsSettingModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
