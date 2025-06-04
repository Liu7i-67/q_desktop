import { Drawer } from "@/components/TXDrawer";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Button } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import {
  IDictionaryConfigDrawerProps,
  IDictionaryConfigDrawerRef,
} from "./interface";
import AddOrEditDictionaryValueModal from "./modules/AddOrEditDictionaryValueModal";
import ConfigDrawerTitle from "./modules/ConfigDrawerTop";
import ConfigTable from "./modules/ConfigTable";
import { Provider, useStore } from "./store/RootStore";

const DictionaryConfigDrawer = observer(
  forwardRef<IDictionaryConfigDrawerRef, IDictionaryConfigDrawerProps>(
    function DictionaryConfigDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed, refs } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <>
          <Drawer
            open={logic.open}
            width={1200}
            title="字典配置"
            destroyOnClose
            onClose={logic.closeDrawer}
            loading={computed.loading}
            footer={
              <div className={"w-full flex justify-end"}>
                <Button onClick={logic.closeDrawer}>关闭</Button>
              </div>
            }
          >
            <div className={"px-4"}>
              <ConfigDrawerTitle />
              <div className={"w-full h-[1px] bg-gray-200/50 my-4"} />
              <ConfigTable />
            </div>
          </Drawer>
          <AddOrEditDictionaryValueModal
            ref={refs.addOrEditDictionaryValueModalRef}
            afterClose={logic.getList}
          />
        </>
      );
    }
  )
);

export default observer(
  forwardRef<IDictionaryConfigDrawerRef, IDictionaryConfigDrawerProps>(
    function DictionaryConfigDrawerPage(props, ref) {
      return (
        <Provider>
          <DictionaryConfigDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
