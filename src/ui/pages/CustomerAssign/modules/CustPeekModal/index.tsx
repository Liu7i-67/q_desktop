import { Modal } from "@/components/TXModal";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { forwardRef, ReactNode, useImperativeHandle, useMemo } from "react";
import { ICustPeekModalProps, ICustPeekModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const CustPeekModal = observer(
  forwardRef<ICustPeekModalRef, ICustPeekModalProps>(
    function CustPeekModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      const renderMessage = useMemo(() => {
        let repeatMessage: ReactNode = "没有重复数据哦~";
        if (logic.initData?.repeatMessage) {
          repeatMessage = logic.initData?.repeatMessage
            ?.split("\n")
            ?.map((t, tIndex) => {
              return (
                <div key={tIndex} className="mb-1">
                  {t}
                </div>
              );
            });
        }
        return repeatMessage;
      }, [logic.initData]);

      return (
        <Modal
          open={logic.open}
          width={450}
          destroyOnClose
          onCancel={logic.closeModal}
          onOk={logic.closeModal}
          bodyProps={{
            style: { padding: "16px" },
          }}
          centered
        >
          <div className="font-bold text-[18px] mb-2">查重结果</div>
          {renderMessage}
          {logic.initData?.historyDispatchInfoDTO
            ?.dispatchedFromOtherTenantFlag && (
            <div className="font-bold text-[18px] my-2">历史派单查重结果</div>
          )}
          {logic.initData?.historyDispatchInfoDTO
            ?.dispatchedFromOtherTenantFlag && (
            <div>
              该联系方式历史曾被
              {window.location.host.includes("qingyan") ? "讨喜" : "清颜"}
              派单，详情请前往老OA系统查看
            </div>
          )}
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<ICustPeekModalRef, ICustPeekModalProps>(
    function CustPeekModalPage(props, ref) {
      return (
        <Provider>
          <CustPeekModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
