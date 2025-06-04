import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import { IUserPickerDrawerProps, IUserPickerDrawerRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { SearchRow } from "./modules/SearchRow";
import { PickerList } from "./modules/PickerList";
import { PickerInfo } from "./modules/PickerInfo";

const UserPickerDrawer = observer(
  forwardRef<IUserPickerDrawerRef, IUserPickerDrawerProps>(
    function UserPickerDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <Drawer
          open={logic.open}
          width={600}
          title="排班员工选择"
          extra={<PickerInfo />}
          onClose={logic.closeDrawer}
          maskClosable
          styles={{
            body: {
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              padding: 0,
            },
          }}
        >
          <SearchRow />
          <PickerList />
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<IUserPickerDrawerRef, IUserPickerDrawerProps>(
    function UserPickerDrawerPage(props, ref) {
      return (
        <Provider>
          <UserPickerDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
