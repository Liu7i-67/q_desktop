import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Radio } from "antd";

const options = [
  {
    label: "不固定",
    value: false,
  },
  {
    label: "固定",
    value: true,
  },
];

export const FixedY = observer(function FixedY_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div>
      <div className="text-gray-400 mb-1">列表高度</div>
      <Radio.Group
        options={options}
        optionType="button"
        buttonStyle="solid"
        value={logic.fixedY}
        onChange={(e) => {
          logic.changeFixedY(e.target.value);
        }}
      ></Radio.Group>
    </div>
  );
});
