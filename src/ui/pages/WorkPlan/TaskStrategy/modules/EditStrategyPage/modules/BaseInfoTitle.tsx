import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "./StepForm/store/RootStore";

export interface IBaseInfoTitleProps {}

const BaseInfoTitle = observer(function BaseInfoTitle_(
  props: IBaseInfoTitleProps
) {
  const root = useStore();
  const { propsStore } = root;
  return (
    <div className="pb-[20px] px-6 font-semibold text-[20px] text-[rgba(36, 39, 49, 1)] border-b-[1px] border-solid border-[rgba(233, 234, 236, 1)]">
      {propsStore.props.stepCurrent === 0 ? "基础信息" : "任务配置"}
    </div>
  );
});

export default BaseInfoTitle;
