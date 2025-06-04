import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Checkbox } from "antd";

export const PickerContent = observer(function PickerContent_() {
  const root = useStore();
  const { logic, computed } = root;
  return (
    <div className="mb-2">
      <span className="text-gray-400 mr-4">可选字段</span>
      <Checkbox
        checked={computed.checkedAll}
        indeterminate={computed.indeterminate}
        onChange={(e) => {
          logic.multipleChoices(e.target.checked);
        }}
      >
        全选
      </Checkbox>
    </div>
  );
});
