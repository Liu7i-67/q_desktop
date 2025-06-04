import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  ISchedulePickerDrawerProps,
  ISchedulePickerDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { WorkingShilftPicker } from "./modules/WorkingShilftPicker";
import { EditContent } from "./modules/EditContent";
import { Button } from "antd";

const SchedulePickerDrawer = observer(
  forwardRef<ISchedulePickerDrawerRef, ISchedulePickerDrawerProps>(
    function SchedulePickerDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <Drawer
          open={logic.open}
          title="排班"
          width={1000}
          destroyOnClose
          loading={computed.loading}
          onClose={logic.closeDrawer}
          footer={<WorkingShilftPicker />}
          extra={
            <Button type="primary" onClick={logic.saveSelect}>
              确定
            </Button>
          }
        >
          <EditContent />
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<ISchedulePickerDrawerRef, ISchedulePickerDrawerProps>(
    function SchedulePickerDrawerPage(props, ref) {
      return (
        <Provider>
          <SchedulePickerDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
