import { observer } from "@quarkunlimit/qu-mobx";
import { Select, SelectProps } from "antd";
import { taskCancelOption } from "../../../constant";
import { useStore } from "../../../store/RootStore";

export interface ITaskRelaySelectProps extends SelectProps {}

const TaskCancelOption = observer(function TaskCreateOption_(
  props: ITaskRelaySelectProps
) {
  const root = useStore();
  const { refs } = root;

  return (
    <Select
      {...props}
      mode="multiple"
      options={taskCancelOption}
      size="large"
      placeholder="请选择任务取消场景"
      onChange={(value) => {
        if (value?.includes("UPDATE_COLLAB_INFO")) {
          refs.steopTwoForm.setFieldValue("taskRelayScenario", []);
        }
        props.onChange?.(value);
      }}
    />
  );
});

export default TaskCancelOption;
