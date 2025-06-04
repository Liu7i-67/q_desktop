import { ITXTreeCascaderRef } from "@/components/TXTreeCascader/interface";
import { TTXTreeCascaderNode } from "@/components/TXTreeCascader/store/RootStore/interface";
import { ITaskContentDTO } from "@/service/business/v1/task-strategy/get-page";
import { IReqBusinessV1TaskStartegySave } from "@/service/business/v1/task-strategy/save";
import { TRecord } from "@/utils/interface";
import { LoadingStore, PropsStore } from "@quarkunlimit/qu-mobx";
import { FormInstance } from "antd";
import { IDefaultCheckedCaretaker } from "../../constant";
import { IStepFormProps } from "../../interface";
import { RootStore } from "./";
import { Computed } from "./Computed";
import { Logic } from "./Logic";

export type TLoadingStore = LoadingStore<
  "loading" | "onStepTwoFormSumbit" | "onGetTaskDetail"
>;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /**@param 表单二任务创建场景的值*/
  stepTwotaskCreateScenario: string[];
  /**@param 表单二任务内容的值 */
  stepTwotaskContent: Partial<ITaskContentDTO>[];
  /**@param 打开选择弹窗时是执行人还是管理人，值是Executor、 Caretaker*/
  treeCascaderInputType: string;
  /**@param 步骤条一表单值 */
  stepOneFormValue: TRecord;
  /**@param 步骤二表单表单值 */
  stepTwoFormValue: TRecord;
  /**@function 步骤一表单管理人创建时默认选中 */
  onInitStepOneFormCaretakerWithCreate: () => void;
  /**@function 向外暴露form内容 */
  exportStepFormValues: () => TRecord;
  /**@function 打开树级联选择弹窗 */
  onOpenTxTreeCascader: (type: string) => void;
  /**@function 树级联选择弹窗确认后 */
  onTxTreeCascaderChekced: (checkedNodes: TTXTreeCascaderNode[]) => void;
  /**@function 步骤一表单取消按钮回调 */
  onStepOneCancel: () => void;
  /**@function 步骤一表单下一步按钮回调 */
  onStepOneNext: () => Promise<void>;
  /**@function 步骤二表单上一步按钮回调 */
  onStepTwoBack: () => void;
  /**@function 步骤二表单提交按钮回调 */
  onStepTwoFormSumbit: () => Promise<void>;
  /**@function 初始化步骤二表单 */
  onInitStepTwoForm: (value: ISteopOneForm) => void;
  /**@function 新增任务 */
  onSave: (request: IReqBusinessV1TaskStartegySave) => Promise<void>;
  /**@function 编辑任务 */
  onUpdate: (request: IReqBusinessV1TaskStartegySave) => Promise<void>;
  /**@function 初始化表单二的任务创建场景的值 */
  onInitStepTwoTaskCreateScenario: () => { taskCreateScenario: string[] };
  /**@function 根据清颜还是讨喜，勾上对应的管理人 */
  onJudgeDefaultCheckedCareTaker: () => IDefaultCheckedCaretaker[];
  /**@function 初始化步骤二表单任务接力场景 */
  onInitStepTwoTaskRelay: () => TRecord | { taskRelayScenario: string[] };
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IStepFormProps>;
}

export interface IRefs {
  steopOneForm: FormInstance<ISteopOneForm>;
  steopTwoForm: FormInstance<ISteopTwoForm>;
  txTreeCascaderRef: React.RefObject<ITXTreeCascaderRef>;
}

export interface ISteopOneForm
  extends Pick<
    IReqBusinessV1TaskStartegySave,
    "strategyName" | "strategyDesc" | "followSource"
  > {
  caretaker: TTXTreeCascaderNode[];
  executor: TTXTreeCascaderNode[];
}

export interface ISteopTwoForm
  extends Partial<
    Omit<
      IReqBusinessV1TaskStartegySave,
      | "strategyName"
      | "strategyDesc"
      | "executor"
      | "caretaker"
      | "followSource"
    >
  > {}
