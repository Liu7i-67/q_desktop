import { ETaskEunm } from "@/pages/WorkPlan/TaskStrategy/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Select, SelectProps } from "antd";
import { useStore } from "../../../store/RootStore";

export interface ITaskRelaySelectProps extends SelectProps {}

const TaskRelaySelect = observer(function TaskRelaySelect_(
  props: ITaskRelaySelectProps
) {
  const root = useStore();
  const { refs, logic } = root;

  const stepTwoFormValues = Form.useWatch(
    (values) => values,
    refs.steopTwoForm
  );

  const disabled =
    logic.stepOneFormValue.followSource !== "MANUAL_CREATE"
      ? stepTwoFormValues?.taskCreateScenario?.includes("UPDATE_COLLAB_INFO") ||
        stepTwoFormValues?.taskCancelScenario?.includes("UPDATE_COLLAB_INFO")
      : stepTwoFormValues?.taskCancelScenario?.includes("UPDATE_COLLAB_INFO");

  return (
    <Select
      {...props}
      mode="multiple"
      options={[
        {
          label: "更新用户协作员工",
          value: ETaskEunm.UPDATE_COLLAB_INFO,
          disabled,
        },
      ]}
      size="large"
      placeholder="请选择任务接力场景"
    />
  );
});

export default TaskRelaySelect;
