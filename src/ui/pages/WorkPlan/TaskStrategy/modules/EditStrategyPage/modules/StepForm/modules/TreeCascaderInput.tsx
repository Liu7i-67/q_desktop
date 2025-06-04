import { TTXTreeCascaderNode } from "@/components/TXTreeCascader/store/RootStore/interface";
import { deduplicateByKey } from "@/components/TXTreeCascader/tool";
import { observer } from "@quarkunlimit/qu-mobx";
import { Image, Input } from "antd";
import rightArrowIcon from "../../../../../svg/rightArrow.svg";
import { useStore } from "../store/RootStore";

export interface ITreeCascaderInputProps {
  value?: TTXTreeCascaderNode[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: "Executor" | "Caretaker";
}

const TreeCascaderInput = observer(function TreeCascaderInput_(
  props: ITreeCascaderInputProps
) {
  const root = useStore();
  const { logic } = root;

  return (
    <Input
      {...props}
      size="large"
      value={`选择人员(已选${deduplicateByKey(props.value ?? [], "title").length ?? 0}人/组织)`}
      className="!cursor-pointer"
      readOnly
      suffix={
        <Image src={rightArrowIcon} width={16} height={16} preview={false} />
      }
      onClick={() => {
        logic.onOpenTxTreeCascader(props.type);
      }}
    />
  );
});

export default TreeCascaderInput;
