import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { LightSvg } from "../svg";

export const LeftTips = observer(function LeftTips_() {
  const root = useStore();
  const { logic } = root;

  if (!logic.suggests.length) {
    return null;
  }

  return (
    <div className="bg-[#f7f8fc] px-[10px] py-[10px] rounded-md max-h-[152px] flex flex-col">
      <div className="flex items-center gap-[6px]">
        {LightSvg}
        <span className="text-[16px] font-bold">跟进建议</span>
      </div>
      <div className="text-[#666666] flex flex-col gap-1 mt-1 flex-1 overflow-y-auto">
        {logic.suggests.map((r, rIndex) => {
          return (
            <div key={rIndex}>
              {rIndex + 1}. {r.taskDesc}
            </div>
          );
        })}
      </div>
    </div>
  );
});
