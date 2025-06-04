import { cn } from "@/utils/tools";
import { observer } from "@quarkunlimit/qu-mobx";
import { TTXTreeCascaderNode } from "../store/RootStore/interface";

export interface ITitleRenderProps {
  node: TTXTreeCascaderNode;
}

const TitleRender = observer(function TitleRender_({
  node,
}: ITitleRenderProps) {
  return (
    <span
      className={cn(
        `text-[16px] leading-[22px]`,
        node.highLight ? "text-[#1677ff] underline $" : ""
      )}
    >
      {node.title as string}
    </span>
  );
});

export default TitleRender;
