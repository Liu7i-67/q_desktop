import { ETaskEunm } from "@/pages/WorkPlan/TaskStrategy/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Select, SelectProps } from "antd";
import { taskCreateOption } from "../../../constant";
import { useStore } from "../../../store/RootStore";

export interface ITaskRelaySelectProps extends SelectProps {}

const TaskCreateOption = observer(function TaskCreateOption_(
  props: ITaskRelaySelectProps
) {
  const root = useStore();
  const { logic, refs } = root;

  let options = [...taskCreateOption];

  const isManualCreate =
    logic.stepOneFormValue?.followSource === "MANUAL_CREATE";

  if (isManualCreate) {
    options.push({
      label: "设置下次跟进时间",
      value: ETaskEunm.SET_NEXT_FOLLOW_TIME,
    });
  }

  return (
    <Select
      {...props}
      mode="multiple"
      options={options}
      size="large"
      disabled={isManualCreate}
      placeholder="请选择任务创建场景"
      onChange={(value) => {
        if (value?.includes("UPDATE_COLLAB_INFO")) {
          refs.steopTwoForm.setFieldValue("taskRelayScenario", []);
        }
        props.onChange?.(value);
      }}
    />
  );
});

export default TaskCreateOption;
