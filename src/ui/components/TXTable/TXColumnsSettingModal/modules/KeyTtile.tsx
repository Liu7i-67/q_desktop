import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Column } from "./Column";
import { DndContext, useDroppable } from "@dnd-kit/core";

export const KeyTtile = observer(function KeyTtile_(props: { title?: string }) {
  const { title } = props;
  const { setNodeRef } = useDroppable({
    id: "_tx_",
  });
  return (
    <div className="text-gray-400 py-1 text-xs" ref={setNodeRef}>
      {title}
    </div>
  );
});
