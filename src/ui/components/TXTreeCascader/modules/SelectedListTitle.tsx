import { observer } from "@quarkunlimit/qu-mobx";
import { getConfigMap } from "../config";
import { useStore } from "../store/RootStore";
import { deduplicateByKey } from "../tool";

const SelectedListTitle = observer(function SelectedListTitle_() {
  const root = useStore();
  const { logic, propsStore } = root;

  const config = getConfigMap(propsStore.props.type);
  return (
    <div className="flex-1 py-3 sticky">
      <div className="flex justify-start items-center text-[20px]">
        <div className="bg-[#0867E9] w-[6px] rounded-[100px] h-[26px]"></div>
        <div className="ml-[6px]">
          {config.selectedTitle}
          <span className="text-[#0867E9]">
            （{deduplicateByKey(logic.checkedNodes, "title").length}）
          </span>
        </div>
      </div>
    </div>
  );
});

export default SelectedListTitle;
