import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Tag, Tooltip } from "antd";
import { TXTag } from "@/components/TXTag";

export const WorkingShiftList = observer(function WorkingShiftList_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex items-start gap-2 mt-4">
      <h4 className="m-0 text-gray-500">班次说明：</h4>
      <div className="flex flex-1 flex-wrap gap-2">
        {logic.workingShift.map((w) => {
          return (
            <Tooltip title={`${w.startTime} - ${w.endTime}`} key={w.id}>
              <TXTag
                color={w.frontendExtension || undefined}
                className="cursor-pointer"
                text={w.shiftName}
              ></TXTag>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
});
