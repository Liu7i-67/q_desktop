import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import {
  CloseOutlined,
  HolderOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export const Column = observer(function Column_(props: { dataKey: string }) {
  const root = useStore();
  const { logic } = root;
  const { dataKey } = props;
  const record = logic.columnMap.get(dataKey);
  const { setNodeRef } = useDroppable({
    id: dataKey,
  });
  const {
    attributes,
    listeners,
    setNodeRef: setDragNodeRef,
    transform,
  } = useDraggable({
    id: dataKey,
  });

  if (!record) return null;

  const isFixed = ["left", "right"].includes(record.fixed as string);

  const styleBox: React.CSSProperties = {};

  if (transform) {
    styleBox.transform = `translate3d(${transform.x}px, ${transform.y}px, 0)`;
    styleBox.opacity = "0.7";
  }

  return (
    <div
      className="flex py-1 tx-column-row bg-white pr-1"
      style={styleBox}
      ref={setNodeRef}
      {...attributes}
    >
      <HolderOutlined
        className="text-gray-400 mr-2"
        ref={setDragNodeRef}
        {...listeners}
      />
      <span className="flex-1">
        {typeof record.title == "function" ? record.title({}) : record.title}
      </span>
      <span className="w-[60px] ml-2 flex gap-2 text-gray-400 justify-end">
        {!isFixed && (
          <Tooltip title="固定在左侧">
            <VerticalAlignTopOutlined
              className="opacity-0"
              onClick={() => logic.fixedToLeft(dataKey)}
            />
          </Tooltip>
        )}
        {!isFixed && (
          <Tooltip title="固定在右侧">
            <VerticalAlignBottomOutlined
              className="opacity-0"
              onClick={() => logic.fixedToRight(dataKey)}
            />
          </Tooltip>
        )}
        {isFixed && (
          <Tooltip title="取消固定">
            <VerticalAlignMiddleOutlined
              className="opacity-0"
              onClick={() => logic.cancelFixed(dataKey)}
            />
          </Tooltip>
        )}
        <Tooltip title="隐藏">
          <CloseOutlined onClick={() => logic.changeHidden(dataKey)} />
        </Tooltip>
      </span>
    </div>
  );
});
