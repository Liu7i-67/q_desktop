import { observer } from "@quarkunlimit/qu-mobx";
import { InputNumber, InputNumberProps } from "antd";
import { useStore } from "../../../store/RootStore";

export interface ITaskTimeInputNumberProps
  extends Pick<InputNumberProps, "value" | "onChange"> {
  type: "start" | "end";
}

const TaskTimeInputNumber = observer(function TaskTimeInputNumber_(
  props: ITaskTimeInputNumberProps
) {
  const root = useStore();
  const { refs, logic } = root;
  const isManualCreate =
    logic.stepOneFormValue?.followSource === "MANUAL_CREATE";
  const { type, ...rest } = props;

  return (
    <div className="flex items-center gap-x-[10px]">
      <div>第</div>
      <InputNumber
        {...rest}
        min={1}
        controls={false}
        disabled={isManualCreate}
      />
      <div>天</div>
      <div>{props.type === "start" ? "00:00" : "23:59"}</div>
    </div>
  );
});

export default TaskTimeInputNumber;
