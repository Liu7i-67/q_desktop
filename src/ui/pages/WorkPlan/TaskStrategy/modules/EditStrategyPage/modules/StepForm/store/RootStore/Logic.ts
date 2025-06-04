import { TTXTreeCascaderNode } from "@/components/TXTreeCascader/store/RootStore/interface";
import { IResBusinessV1TaskStartegyIndex } from "@/service/business/v1/task-strategy";
import { ITaskContentDTO } from "@/service/business/v1/task-strategy/get-page";
import { IReqBusinessV1TaskStartegySave } from "@/service/business/v1/task-strategy/save";
import { IReqBusinessV1TaskStartegyUpdate } from "@/service/business/v1/task-strategy/update";
import { TRecord } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import UserHelper from "@/utils/user-helper";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { defaultCheckedCaretaker } from "../../constant";
import { IGernerateFormValue, ISumbitFormValues } from "../../interface";
import {
  get_task_strategy_detail,
  save_task_strategy,
  update_task_strategy,
} from "../../service";
import {
  generateExecutorAndCaretaker,
  uniqueCaretakerById,
  uniqueCaretakerByKey,
} from "../../tool";
import { RootStore } from "./";
import {
  ILogic,
  ISteopOneForm,
  ISteopTwoForm,
  TLoadingStore,
} from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  treeCascaderInputType: string = "Executor";
  stepOneFormValue: Partial<ISteopOneForm> = {};
  stepTwoFormValue: Partial<ISteopTwoForm> = {};
  stepTwotaskCreateScenario: string[] = [];
  stepTwotaskContent: Partial<ITaskContentDTO>[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onStepTwoFormSumbit = withRequest(
      this.onStepTwoFormSumbit,
      "onStepTwoFormSumbit"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async onStepTwoFormSumbit() {
    const { refs, propsStore } = this.rootStore;
    const values = await refs.steopTwoForm.validateFields();
    if (!values) return;
    const request = this.generateSumbitValues({
      ...this.stepOneFormValue,
      ...values,
    } as ISumbitFormValues);
    if (
      request.followSource === "AUTO_CREATE" &&
      (!values.taskContent || !values.taskContent?.length)
    ) {
      message.error("请填写至少一条任务内容");
      return;
    }
    if (propsStore.props.manageStartgyEditId) {
      await this.onUpdate(request);
      return;
    }
    await this.onSave(request);
  }

  async onSave(request: IReqBusinessV1TaskStartegySave) {
    const { propsStore } = this.rootStore;
    const [err, res] = await to(save_task_strategy(request));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "新增失败",
      });
      return;
    }
    message.success("新增成功");
    runInAction(() => {
      this.stepOneFormValue = {};
      this.stepTwoFormValue = {};
      this.treeCascaderInputType = "Executor";
    });
    this.onResetForm();
    propsStore.props.onStrategyVisibleChange(false);
    propsStore.props.onSetStepCurrent(0);
  }

  async onUpdate(request: IReqBusinessV1TaskStartegyUpdate) {
    const { propsStore } = this.rootStore;
    const [err, res] = await to(update_task_strategy(request));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "编辑失败",
      });
      return;
    }
    message.success("编辑成功");
    runInAction(() => {
      this.stepOneFormValue = {};
      this.stepTwoFormValue = {};
      this.treeCascaderInputType = "Executor";
    });
    this.onResetForm();
    propsStore.props.onStrategyVisibleChange(false);
    propsStore.props.onSetStepCurrent(0);
  }

  async onStepOneNext() {
    const { propsStore, refs } = this.rootStore;
    const values = await refs.steopOneForm.validateFields();
    if (!values) return;
    propsStore.props.onSetStepCurrent(1);
    this.stepOneFormValue = values;
    this.onInitStepTwoForm();
  }

  async onGetTaskDetail() {
    const { propsStore, refs } = this.rootStore;

    const [err, res] = await to(
      get_task_strategy_detail({
        id: propsStore.props.manageStartgyEditId,
      })
    );

    if (err || !res) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    const value = this.generateTaskDetailData(res.data ?? {});
    runInAction(() => {
      refs.steopOneForm.setFieldsValue(value);
      this.stepTwotaskCreateScenario = value.taskCreateScenario;
      this.stepTwotaskContent = value.taskContent;
      this.stepTwoFormValue = {
        taskCreateScenario: value.taskCreateScenario,
        taskStartScenario: value.taskStartScenario,
        taskFinishScenario: value.taskFinishScenario,
        taskCancelScenario: value.taskCancelScenario,
        taskTimeoutScenario: value.taskTimeoutScenario,
        taskRelayScenario: value.taskRelayScenario,
      };
    });
  }

  onInitStepOneFormCaretakerWithCreate() {
    const defaultCheckedCaretaker = this.onJudgeDefaultCheckedCareTaker();
    this.rootStore.refs.steopOneForm.setFieldValue(
      "caretaker",
      defaultCheckedCaretaker
    );
  }

  onResetForm() {
    const { refs } = this.rootStore;
    refs.steopOneForm.resetFields();
    refs.steopTwoForm.resetFields();
    this.stepOneFormValue = {};
    this.stepOneFormValue = {};
    this.stepTwotaskCreateScenario = [];
    this.stepTwotaskContent = [];
    this.treeCascaderInputType = "Executor";
  }

  generateTaskDetailData(data: IResBusinessV1TaskStartegyIndex) {
    return {
      ...data,
      caretaker: generateExecutorAndCaretaker(
        data.caretaker ?? {
          departmentList: [],
          userList: [],
        }
      ),
      executor: generateExecutorAndCaretaker(
        data.executor ?? {
          departmentList: [],
          userList: [],
        }
      ),
    };
  }

  generateCaretakerOrExecutorSubmitValue(
    data: TTXTreeCascaderNode[],
    type: string
  ) {
    let departmentList: { id: string }[] = [];
    let userList: { id: string }[] = [];
    data.map((node) => {
      let currentkey = (node.key as string).split("_")[node.level ?? 0];
      if (node.isDept) {
        if (!departmentList.find((item) => item.id === currentkey)) {
          departmentList.push({
            id: currentkey,
          });
          return;
        }
      }
      if (!userList.find((item) => item.id === currentkey)) {
        userList.push({
          id: currentkey,
        });
      }
    });

    if (type === "caretaker") {
      userList = uniqueCaretakerById([...userList]);
    }

    return {
      departmentList,
      userList,
    };
  }

  generateTaskSelectRequest(values: IGernerateFormValue) {
    const result: TRecord = {};
    [
      "taskCreateScenario",
      "taskStartScenario",
      "taskFinishScenario",
      "taskCancelScenario",
      "taskTimeoutScenario",
    ].map((key) => {
      result[key] = Array.isArray(values[key]) ? values[key] : [values[key]];
    });
    return {
      ...result,
      taskRelayScenario:
        values.taskRelayScenario?.filter((v) => v !== null) ?? [],
    };
  }

  generateSumbitValues(values: IGernerateFormValue) {
    let request = {
      ...values,
      ...this.generateTaskSelectRequest(values),
      caretaker: this.generateCaretakerOrExecutorSubmitValue(
        values.caretaker,
        "caretaker"
      ),
      executor: this.generateCaretakerOrExecutorSubmitValue(
        values.executor,
        "executor"
      ),
      ...(this.rootStore.propsStore.props.manageStartgyEditId
        ? {
            id: this.rootStore.propsStore.props.manageStartgyEditId,
          }
        : {}),
    };
    if (values.followSource === "MANUAL_CREATE") {
      delete request["taskContent"];
    }
    return request;
  }

  exportStepFormValues() {
    return this.rootStore.refs.steopOneForm.getFieldsValue();
  }

  onOpenTxTreeCascader(type: string) {
    const { refs } = this.rootStore;
    this.treeCascaderInputType = type;
    if (type === "Executor") {
      refs.txTreeCascaderRef.current?.openModal(
        refs.steopOneForm.getFieldValue("executor")
          ? {
              checkedNodes: refs.steopOneForm.getFieldValue("executor"),
            }
          : undefined
      );
      return;
    }
    const caretakerFormValue: TTXTreeCascaderNode[] =
      refs.steopOneForm.getFieldValue("caretaker") ?? [];
    let checkedNodes: TTXTreeCascaderNode[] = uniqueCaretakerByKey([
      ...caretakerFormValue,
    ]);
    refs.txTreeCascaderRef.current?.openModal({
      checkedNodes,
    });
  }

  onTxTreeCascaderChekced(checkedNodes: TTXTreeCascaderNode[]) {
    const { refs } = this.rootStore;
    if (this.treeCascaderInputType === "Executor") {
      refs.steopOneForm.setFieldValue("executor", checkedNodes);
      return;
    }
    refs.steopOneForm.setFieldValue("caretaker", checkedNodes);
  }

  onStepOneCancel() {
    const { propsStore } = this.rootStore;
    this.onResetForm();
    propsStore.props.onStrategyVisibleChange(false);
  }

  onStepTwoBack() {
    const { refs, propsStore } = this.rootStore;
    this.stepTwoFormValue = refs.steopTwoForm.getFieldsValue();
    if (this.stepOneFormValue.followSource === "AUTO_CREATE") {
      this.stepTwotaskCreateScenario =
        this.stepTwoFormValue.taskCreateScenario ?? [];
      this.stepTwotaskContent = this.stepTwoFormValue.taskContent ?? [
        {
          taskCreateCondition: "UNLIMITED",
          taskDesc: " ",
          taskStartTime: 1,
          taskEndTime: 1,
          priorityFlag: false,
        },
      ];
    }
    propsStore.props.onSetStepCurrent(0);
    refs.steopOneForm.setFieldsValue({ ...this.stepOneFormValue });
  }

  onInitStepTwoTaskCreateScenario() {
    const { refs } = this.rootStore;
    const isManualCreate =
      refs.steopOneForm.getFieldValue("followSource") === "MANUAL_CREATE";
    if (isManualCreate) {
      return {
        taskCreateScenario: ["SET_NEXT_FOLLOW_TIME"],
      };
    }
    const hasIncludesNextFollowTime = this.stepTwotaskCreateScenario.includes(
      "SET_NEXT_FOLLOW_TIME"
    );
    return {
      taskCreateScenario: !hasIncludesNextFollowTime
        ? this.stepTwotaskCreateScenario
        : [],
    };
  }

  onInitStepTwoTaskContent() {
    const isManualCreate =
      this.stepOneFormValue.followSource === "MANUAL_CREATE";
    if (isManualCreate) {
      return {
        taskContent: [
          {
            taskCreateCondition: "UNLIMITED",
            taskDesc: " ",
            taskStartTime: 1,
            taskEndTime: 1,
            priorityFlag: false,
          },
        ],
      };
    }
    const hasNotTaskContent =
      !this.stepTwotaskContent ||
      (Array.isArray(this.stepTwotaskContent) &&
        !this.stepTwotaskContent.length);
    if (hasNotTaskContent) {
      return {
        taskContent: [
          {
            taskCreateCondition: "UNLIMITED",
            taskDesc: "",
            taskStartTime: 1,
            taskEndTime: 1,
            priorityFlag: false,
          },
        ],
      };
    }
    return {
      taskContent: this.stepTwotaskContent,
    };
  }

  onInitStepTwoTaskRelay() {
    const isManualCreate =
      this.stepOneFormValue.followSource === "MANUAL_CREATE";
    if (!isManualCreate) {
      if (
        this.stepTwotaskCreateScenario.includes("UPDATE_COLLAB_INFO") ||
        this.stepTwoFormValue.taskCancelScenario?.includes("UPDATE_COLLAB_INFO")
      ) {
        return {
          taskRelayScenario: [],
        };
      }
    }
    if (
      this.stepTwoFormValue.taskCancelScenario?.includes("UPDATE_COLLAB_INFO")
    ) {
      return {
        taskRelayScenario: [],
      };
    }
    return {};
  }

  onInitStepTwoForm() {
    const { refs } = this.rootStore;
    refs.steopTwoForm.setFieldsValue({
      taskStartScenario: ["TASK_START_TIME"],
      taskFinishScenario: ["TASK_START_AND_DEADLINE_NEW_CONTENT"],
      taskTimeoutScenario: ["TASK_START_AND_DEADLINE_NOT_COMPLETED"],
      ...this.stepTwoFormValue,
      ...this.onInitStepTwoTaskCreateScenario(),
      ...this.onInitStepTwoTaskContent(),
      ...this.onInitStepTwoTaskRelay(),
    });
  }

  onCustomExtraNodeKey(node: TRecord) {
    return {
      isDept: node.hasOwnProperty("deptName"),
    };
  }

  onJudgeDefaultCheckedCareTaker() {
    const tenantId = UserHelper.getInstance().tenantId;
    return defaultCheckedCaretaker.filter((item) => item.tenantId === tenantId);
  }
}
