import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Tag, Tooltip } from "antd";
import { TXTag } from "@/components/TXTag";

export const WorkingShilftPicker = observer(function WorkingShilftPicker_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="min-h-[100px] max-h-[200px] overflow-y-auto ">
      <div className="flex flex-wrap gap-2 items-start">
        <span>选择班次：</span>
        {logic.workingShift.map((w) => {
          return (
            <Tooltip title={`${w.startTime} - ${w.endTime}`} key={w.id}>
              <TXTag
                color={w.frontendExtension}
                text={w.shiftName}
                className="cursor-pointer"
                onClick={() => logic.addShift(w)}
              ></TXTag>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
});
