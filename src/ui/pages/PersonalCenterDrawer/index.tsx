// 个人中心-抽屉
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  IPersonalCenterDrawerProps,
  IPersonalCenterDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { BaseInfo } from "./modules/BaseInfo";
import EditNicknameModal from "./EditNicknameModal";
import { OptionRow } from "./modules/OptionRow";
import EditPasswordModal from "./EditPasswordModal";

const PersonalCenterDrawer = observer(
  forwardRef<IPersonalCenterDrawerRef, IPersonalCenterDrawerProps>(
    function PersonalCenterDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <Drawer
          title="个人中心"
          open={logic.open}
          width={400}
          destroyOnClose
          onClose={logic.closeDrawer}
        >
          <BaseInfo />
          <OptionRow />
          <EditNicknameModal ref={refs.nickRef} afterClose={logic.afterClose} />
          <EditPasswordModal ref={refs.passwordRef} />
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<IPersonalCenterDrawerRef, IPersonalCenterDrawerProps>(
    function PersonalCenterDrawerPage(props, ref) {
      return (
        <Provider>
          <PersonalCenterDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
