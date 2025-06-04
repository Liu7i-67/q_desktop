import { observer } from "@quarkunlimit/qu-mobx";
import { Steps } from "antd";
import { useStore } from "../store/RootStore";

const StepSide = observer(function StepSide_() {
  const root = useStore();
  const { logic } = root;

  const description = (
    <span className="text-sm leading-[22px]">
      需要填写所有标<span className="text-red-500"> * </span>字段
    </span>
  );

  return (
    <div className="flex justify-center items-start">
      <div className="px-[44px] py-[48px] bg-gradient-to-b from-[#f7f8fc] to-[#fff0] rounded-[10px]">
        <Steps
          className="gap-[14px]"
          direction="vertical"
          current={logic.stepCurrent}
          percent={60}
          items={[
            {
              title: <div className="text-base font-medium">基础信息</div>,
              description,
            },
            {
              title: <div className="text-base font-medium">任务配置</div>,
              description,
            },
          ]}
        />
      </div>
    </div>
  );
});

export default StepSide;
