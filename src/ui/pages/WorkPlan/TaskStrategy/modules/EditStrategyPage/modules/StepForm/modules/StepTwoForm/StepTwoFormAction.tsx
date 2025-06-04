import { observer } from "@quarkunlimit/qu-mobx";
import { Button } from "antd";
import { useStore } from "../../store/RootStore";

const StepTwoFormAction = observer(function StepTwoFormAction_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div
      className="flex justify-start items-center gap-[26px] py-4"
      style={{
        boxShadow: "0 -10px 14px -10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Button className="w-[151px]" size="large" onClick={logic.onStepTwoBack}>
        上一步
      </Button>
      <Button
        className="w-[151px]"
        size="large"
        type="primary"
        onClick={logic.onStepTwoFormSumbit}
      >
        提交
      </Button>
    </div>
  );
});

export default StepTwoFormAction;
