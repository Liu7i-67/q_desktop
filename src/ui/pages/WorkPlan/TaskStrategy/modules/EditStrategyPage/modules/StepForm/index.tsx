import { cn } from "@/utils/tools";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import BaseInfoTitle from "../BaseInfoTitle";
import { IStepFormProps, IStepFormRef } from "./interface";
import StepOneForm from "./modules/StepOneForm/StepOneForm";
import StepOneFormAction from "./modules/StepOneForm/StepOneFormAction";
import StepTwoForm from "./modules/StepTwoForm/StepTwoForm";
import StepTwoFormAction from "./modules/StepTwoForm/StepTwoFormAction";
import { Provider, useStore } from "./store/RootStore";

const StepForm = observer(
  forwardRef<IStepFormRef, IStepFormProps>(function StepForm_(props, ref) {
    const root = useStore();
    useSyncProps(root, Object.keys(props), props);
    const { logic, computed } = root;

    useEffect(() => {
      if (props.manageStartgyEditId) {
        logic.onGetTaskDetail();
        return;
      }
      logic.onInitStepOneFormCaretakerWithCreate();
    }, [props.manageStartgyEditId]);

    useImperativeHandle(ref, () => {
      return {};
    });

    return (
      <Spin spinning={computed.loading}>
        <div className="flex flex-col">
          <BaseInfoTitle />
          <div
            className={cn(
              `overflow-y-auto pt-6 px-6`,
              props.stepCurrent === 0 ? "flex-1" : "h-[calc(100vh-216px)]"
            )}
          >
            {props.stepCurrent === 0 ? <StepOneForm /> : <StepTwoForm />}
          </div>
          {props.stepCurrent === 0 ? (
            <StepOneFormAction />
          ) : (
            <StepTwoFormAction />
          )}
        </div>
      </Spin>
    );
  })
);

export default observer(
  forwardRef<IStepFormRef, IStepFormProps>(function StepFormPage(props, ref) {
    return (
      <Provider>
        <StepForm {...props} ref={ref} />
      </Provider>
    );
  })
);
