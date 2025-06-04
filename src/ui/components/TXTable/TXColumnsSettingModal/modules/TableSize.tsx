import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Radio } from "antd";
import { IOption } from "@/utils/interface";

const options: IOption[] = [
  {
    label: "宽松",
    value: "large",
  },
  {
    label: "适中",
    value: "middle",
  },
  {
    label: "紧凑",
    value: "small",
  },
];

export const TableSize = observer(function TableSize_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="mb-4 select-none">
      <div className="text-gray-400 mb-1">列表尺寸</div>
      <Radio.Group
        options={options}
        optionType="button"
        buttonStyle="solid"
        value={logic.tableSize}
        onChange={(e) => {
          logic.changeTableSize(e.target.value);
        }}
      ></Radio.Group>
    </div>
  );
});
