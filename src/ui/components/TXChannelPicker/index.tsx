import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { ITXChannelPickerProps } from "./interface";
import { TreeSelect } from "antd";
import { maxTagPlaceholder } from "../TXEmployeePicker";
import { UserBtn } from "./modules/UserBtn";
import { useEffect } from "react";
import TXEmployeePickerModal from "../TXEmployeePicker/Modal";
import { cn } from "@/utils/tools";

const TXChannelPicker = observer(function TXChannelPicker_(
  props: ITXChannelPickerProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  const { onlyDir, className, ...reset } = props;

  useEffect(() => {
    logic.getData();
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 relative",
        props.className || ""
      )}
    >
      <TreeSelect
        showSearch
        treeCheckable
        treeExpandAction="click"
        treeNodeFilterProp="title"
        maxTagCount={1}
        maxTagTextLength={6}
        maxTagPlaceholder={maxTagPlaceholder}
        allowClear
        treeData={logic.treeData}
        {...reset}
      />
      <UserBtn />
      <TXEmployeePickerModal
        type="TASK_OWNER"
        checkable
        ref={refs.userRef}
        onOk={logic.getChannelByUser}
      />
    </div>
  );
});

export default observer(function TXChannelPickerPage(
  props: ITXChannelPickerProps
) {
  return (
    <Provider>
      <TXChannelPicker {...props} />
    </Provider>
  );
});
