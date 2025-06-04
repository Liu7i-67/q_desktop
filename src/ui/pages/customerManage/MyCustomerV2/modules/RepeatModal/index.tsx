import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IRepeatModalProps, IRepeatModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Button, Spin } from "antd";
import CollaborationModal from "@/pages/CollaborationModal";
import RepeatMessage from "./modules/RepeatMessage";

const RepeatModal = observer(
  forwardRef<IRepeatModalRef, IRepeatModalProps>(
    function RepeatModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      const name = window.location.host.includes("qingyan") ? "讨喜" : "清颜";

      return (
        <>
          <Modal
            open={logic.open}
            destroyOnClose
            onCancel={logic.closeModal}
            width={450}
            footer={null}
            bodyProps={{
              style: { padding: "16px" },
            }}
            centered
          >
            <Spin spinning={computed.repeatLoading}>
              <div className="font-bold text-[18px] mb-2">查重结果</div>
              <RepeatMessage repeatResult={logic.repeatResult} />
              {logic.repeatResult?.historyDispatchInfoDTO
                ?.dispatchedFromOtherTenantFlag && (
                <div className="font-bold text-[18px] my-2">
                  历史派单查重结果
                </div>
              )}
              {logic.repeatResult?.historyDispatchInfoDTO
                ?.dispatchedFromOtherTenantFlag && (
                <div>该联系方式历史曾被{name}派单，详情请前往老OA系统查看</div>
              )}
              {logic.repeatResult?.existCustomerId && (
                <div className="pt-4">
                  <Button
                    type="primary"
                    onClick={() => {
                      refs.collRef.current?.openModal({
                        existCustomerId:
                          logic.repeatResult?.existCustomerId || "",
                      });
                      logic.closeModal();
                    }}
                  >
                    添加协作
                  </Button>
                </div>
              )}
            </Spin>
          </Modal>
          {/* 协作弹窗 */}
          <CollaborationModal
            ref={refs.collRef}
            onSuccess={props?.afterClose}
          />
        </>
      );
    }
  )
);

export default observer(
  forwardRef<IRepeatModalRef, IRepeatModalProps>(
    function RepeatModalPage(props, ref) {
      return (
        <Provider>
          <RepeatModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
