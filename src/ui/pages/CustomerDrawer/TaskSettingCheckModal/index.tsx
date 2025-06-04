import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  ITaskSettingCheckModalProps,
  ITaskSettingCheckModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { TipsSvg } from "./svg";
import { Checkbox } from "antd";

const TaskSettingCheckModal = observer(
  forwardRef<ITaskSettingCheckModalRef, ITaskSettingCheckModalProps>(
    function TaskSettingCheckModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
          checkPlan: logic.checkPlan,
        };
      });

      return (
        <Modal
          open={logic.open}
          width={600}
          destroyOnClose
          onCancel={logic.closeModal}
          cancelButtonProps={{ style: { display: "none" } }}
          okText={logic.value.length ? "确定取消" : "不取消任务"}
          onOk={logic.onOk}
        >
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold">重复任务提醒</span>
            {TipsSvg}
          </div>
          <div className="text-[#666] my-3">
            检测到您为该客户创建了多个跟进任务 ，如需调整请勾选需要取消的任务：
          </div>
          <div className="bg-[#f6f7fb] p-[24px] rounded-lg max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Checkbox.Group value={logic.value} onChange={logic.changeValue}>
              {logic.options.map((o) => {
                return (
                  <Checkbox key={o.value} value={o} className="w-full mb-1">
                    下次跟进时间:{o.label}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </div>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<ITaskSettingCheckModalRef, ITaskSettingCheckModalProps>(
    function TaskSettingCheckModalPage(props, ref) {
      return (
        <Provider>
          <TaskSettingCheckModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
