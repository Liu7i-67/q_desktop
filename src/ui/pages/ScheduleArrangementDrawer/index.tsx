import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  IScheduleArrangementDrawerProps,
  IScheduleArrangementDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { TableList } from "./modules/TableList";
import { WorkingShiftList } from "./modules/WorkingShiftList";
import UserPickerDrawer from "./UserPickerDrawer";
import SchedulePickerDrawer from "./SchedulePickerDrawer";
import { Button } from "antd";
import { RedBookSchedulingAuth } from "../workforce/auth";

const ScheduleArrangementDrawer = observer(
  forwardRef<IScheduleArrangementDrawerRef, IScheduleArrangementDrawerProps>(
    function ScheduleArrangementDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <Drawer
          open={logic.open}
          title="日程安排"
          width={1200}
          destroyOnClose
          onClose={logic.closeDrawer}
          extra={
            <Button
              type="primary"
              hidden={!RedBookSchedulingAuth.redBookSchedulingUpdate}
              onClick={logic.saveView}
              loading={computed.loading}
            >
              保存
            </Button>
          }
        >
          <TableList />
          <WorkingShiftList />
          <UserPickerDrawer ref={refs.userRef} onSelect={logic.onUserSelect} />
          <SchedulePickerDrawer
            ref={refs.scheduleRef}
            onSelect={logic.onScheduleSelect}
          />
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<IScheduleArrangementDrawerRef, IScheduleArrangementDrawerProps>(
    function ScheduleArrangementDrawerPage(props, ref) {
      return (
        <Provider>
          <ScheduleArrangementDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
