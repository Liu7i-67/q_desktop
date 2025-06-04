import { IReqBusinessV1CustomerFollowFollowBoardStat } from "@/service/business/v1/customer-follow/follow-board-stat";
import { ISegmentedOption } from "@/utils/interface";
import { getRate100, showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import dayjs, { Dayjs } from "dayjs";
import { customer_follow_board_stat } from "../../../service";
import { ITotalInfo } from "../../interface";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  options: ISegmentedOption[] = [];
  active = "";
  renderSet: Set<string> = new Set();
  childHeight = "calc(100vh - 580px)";
  taskId = "";
  endDate: [Dayjs, Dayjs] = [dayjs().add(-1, "d"), dayjs().add(-1, "d")];

  totalInfo: ITotalInfo | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getTotal = withRequest(this.getTotal, "getTotal");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeEndDate(date: [Dayjs, Dayjs]) {
    this.endDate = date;
    this.getTotal();
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
    const req: IReqBusinessV1CustomerFollowFollowBoardStat = {
      endDateStart: this.endDate[0].format("YYYY-MM-DD"),
      endDateEnd: this.endDate[1].format("YYYY-MM-DD"),
    };

    if (this.taskId) {
      req.taskStrategyIdList = [this.taskId];
    }

    const [err, res] = await to(customer_follow_board_stat(req));
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
        this.totalInfo.taskCompletionRate = getRate100(
          this.totalInfo?.taskCompletionRate
        );
      }
      if (this.totalInfo?.deadlineTaskCompletionRate) {
        this.totalInfo.deadlineTaskCompletionRate = getRate100(
          this.totalInfo?.deadlineTaskCompletionRate
        );
      }
    });
  }
}
