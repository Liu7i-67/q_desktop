import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Column } from "./Column";
import { DndContext } from "@dnd-kit/core";
import { KeyTtile } from "./KeyTtile";

export const KeyRow = observer(function KeyRow_(props: {
  list: string[];
  title?: string;
}) {
  const root = useStore();
  const { logic } = root;
  const { list, title } = props;
  if (!list.length) {
    return null;
  }
  return (
    <div>
      <DndContext onDragEnd={logic.onDragEnd}>
        <KeyTtile title={title} />
        {list.map((i) => {
          return <Column key={i} dataKey={i} />;
        })}
      </DndContext>
    </div>
  );
});
