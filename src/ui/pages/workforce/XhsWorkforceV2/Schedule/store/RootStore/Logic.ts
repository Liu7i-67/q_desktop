import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IResBaseV1UserScheduleMonthView } from "@/service/base/v1/user-schedule/month-view";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { get_month_view } from "../../service";
import dayjs from "dayjs";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  scheduleData: IResBaseV1UserScheduleMonthView[] = [];
  month: dayjs.Dayjs = dayjs(); //默认当月

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getScheduleData() {
    const [err, res] = await to(
      get_month_view({
        scheduleDateStart: dayjs(this.month)
          .startOf("month")
          .format("YYYY-MM-DD"),
        scheduleDateEnd: dayjs(this.month).endOf("month").format("YYYY-MM-DD"),
        scheduleType: "LITTLE_RED_BOOK",
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.scheduleData = res.data;
    });
  }

  changeMonth(month: dayjs.Dayjs) {
    this.month = month;
    this.getScheduleData();
  }
}
