import { observer } from "@quarkunlimit/qu-mobx";
import { Image } from "antd";
import { useStore } from "../store/RootStore";
import deleteIcon from "../svg/delete.svg";
import { deduplicateByKey } from "../tool";
import SelectedListTitle from "./SelectedListTitle";

const SelectedList = observer(function _SelectedList() {
  const root = useStore();
  const { logic } = root;

  return (
    <div className="flex flex-col">
      <SelectedListTitle />
      <div className="flex-1 overflow-auto max-h-[420px] px-3 text-[16px] leading-[22px]">
        {deduplicateByKey(logic.checkedNodes, "title").map((node) => (
          <div
            key={node.key}
            className="py-[5px] flex items-center justify-between"
          >
            <div>
              <>{node.title}</>
            </div>
            <div
              className="hover:bg-[rgba(0,0,0,0.08)] flex items-center justify-center"
              onClick={() => {
                logic.onRemoveSelectedNode(
                  (node.key as string).split("_")[node.level ?? 0]
                );
              }}
            >
              <Image
                alt="删除"
                preview={false}
                src={deleteIcon}
                width={18}
                height={18}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SelectedList;
