import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { forwardRef, useImperativeHandle } from "react";
import { IEditStrategyPageProps, IEditStrategyPageRef } from "./interface";
import StepForm from "./modules/StepForm";
import StepSide from "./modules/StepSide";
import { Provider, useStore } from "./store/RootStore";

const EditStrategyPage = observer(
  forwardRef<IEditStrategyPageRef, IEditStrategyPageProps>(
    function EditStrategyPage_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {};
      });

      return (
        <div className="flex px-2 pt-2 gap-6 h-[calc(100vh-128px)]">
          <StepSide />
          <div className="flex-1 h-[calc(190vh - 92px)]">
            <StepForm
              {...props}
              stepCurrent={logic.stepCurrent}
              onSetStepCurrent={logic.onSetStepCurrent}
              onStrategyVisibleChange={props.onStrategyVisibleChange}
            />
          </div>
        </div>
      );
    }
  )
);

export default observer(
  forwardRef<IEditStrategyPageRef, IEditStrategyPageProps>(
    function EditStrategyPagePage(props, ref) {
      return (
        <Provider>
          <EditStrategyPage {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
