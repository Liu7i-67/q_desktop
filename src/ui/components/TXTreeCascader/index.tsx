import { Modal } from "@/components/TXModal";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { ConfigProvider, Spin } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { getConfigMap } from "./config";
import { ITXTreeCascaderProps, ITXTreeCascaderRef } from "./interface";
import SearchTree from "./modules/SearchTree";
import SelectedList from "./modules/SelectedList";
import { Provider, useStore } from "./store/RootStore";

const TXTreeCascader = observer(
  forwardRef<ITXTreeCascaderRef, ITXTreeCascaderProps>(
    function TXTreeCascader_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, propsStore, computed } = root;

      const config = getConfigMap(propsStore.props.type);

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <ConfigProvider
          theme={{
            components: {
              Input: {
                inputFontSizeLG: 14,
                paddingBlockLG: 11,
              },
            },
          }}
        >
          <Modal
            title={config?.title}
            open={logic.open}
            width={900}
            destroyOnClose
            onCancel={logic.closeModal}
            onOk={logic.onOk}
            okButtonProps={{
              size: "large",
              style: {
                marginLeft: "26px",
                fontSize: "16px",
                lineHeight: "24px",
                padding: "8px 59px",
              },
              loading: computed.loading,
            }}
            cancelButtonProps={{
              size: "large",
              style: {
                fontSize: "16px",
                lineHeight: "24px",
                padding: "8px 59px",
              },
            }}
          >
            <Spin spinning={computed.loading}>
              <div className="flex bg-[#F7F8FC] rounded-lg py-[10px] px-3">
                <div className="flex-1 min-w-0 border-r-1 border-solid">
                  <SearchTree />
                </div>
                <div className="flex border-[1px] border-dashed border-[rgba(204, 204, 204, 0.5)] mx-3"></div>
                <div className="flex-1 min-w-0">
                  <SelectedList />
                </div>
              </div>
            </Spin>
          </Modal>
        </ConfigProvider>
      );
    }
  )
);

export default observer(
  forwardRef<ITXTreeCascaderRef, ITXTreeCascaderProps>(
    function TXTreeCascaderPage(props, ref) {
      return (
        <Provider>
          <TXTreeCascader {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
