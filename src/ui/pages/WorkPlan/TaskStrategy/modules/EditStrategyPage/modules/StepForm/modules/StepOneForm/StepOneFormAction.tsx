import { observer } from "@quarkunlimit/qu-mobx";
import { Button } from "antd";
import { useStore } from "../../store/RootStore";

const StepOneFormAction = observer(function StepOneFormAction_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex justify-start items-center gap-[26px] py-[10px]">
      <Button
        className="w-[151px]"
        size="large"
        onClick={logic.onStepOneCancel}
      >
        取消
      </Button>
      <Button
        className="w-[151px]"
        size="large"
        type="primary"
        onClick={logic.onStepOneNext}
      >
        下一步
      </Button>
    </div>
  );
});

export default StepOneFormAction;
