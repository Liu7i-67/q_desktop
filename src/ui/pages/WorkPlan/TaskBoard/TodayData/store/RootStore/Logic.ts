import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { ISegmentedOption } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import { customer_follow_board_stat } from "../../../service";
import dayjs from "dayjs";
import { ITotalInfo } from "../../interface";
import { BigNumber } from "@/utils/BigNumber";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  options: ISegmentedOption[] = [];
  active = "";
  renderSet: Set<string> = new Set();
  childHeight = "calc(100vh - 580px)";
  taskId = "";
  totalInfo: ITotalInfo | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getTotal = withRequest(this.getTotal, "getTotal");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeTaskId(val: string) {
    this.taskId = val;
    this.getTotal();
  }

  onFold(fold: boolean) {
    if (fold) {
      this.childHeight = "calc(100vh - 440px)";
      return;
    }
    this.childHeight = "calc(100vh - 580px)";
  }

  init() {
    const options: ISegmentedOption[] = [];

    if (true) {
      options.push({
        label: "咨询师数据列表",
        value: "ListOfConsultants",
      });
    }
    if (true) {
      options.push({
        label: "部门数据列表",
        value: "ListOfDpts",
      });
    }
    this.options = options;
    this.active = this.options[0].value || "";
    this.renderSet.add(this.active);
    this.getTotal();
  }

  changeActive(key: string) {
    this.active = key;
    this.renderSet.add(key);
  }

  async getTotal() {
    const today = dayjs().format("YYYY-MM-DD");
    const [err, res] = await to(
      customer_follow_board_stat({
        taskStrategyIdList: this.taskId ? [this.taskId] : undefined,
        endDateStart: today,
        endDateEnd: today,
        searchTotalFlag: true,
      })
    );
    if (err) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      this.totalInfo = res?.data || null;
      if (this.totalInfo?.taskCompletionRate) {
        this.totalInfo.taskCompletionRate = new BigNumber(
          this.totalInfo?.taskCompletionRate
        )
          .multipy(100)
          .getNumber();
      }
      if (this.totalInfo?.deadlineTaskCompletionRate) {
        this.totalInfo.deadlineTaskCompletionRate = new BigNumber(
          this.totalInfo?.deadlineTaskCompletionRate
        )
          .multipy(100)
          .getNumber();
      }
    });
  }
}
