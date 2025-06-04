import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import dayjs, { Dayjs } from "dayjs";
import { IDayCell } from "../../interface";
import { getRate100, showErrorInfo, to } from "@/utils/tools";
import { customer_follow_calendar } from "../../../service";
import { IReqBusinessV1CustomerFollowFollowCalendar } from "@/service/business/v1/customer-follow/follow-calendar";
import { isNil } from "lodash";
import UserHelper from "@/utils/user-helper";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  date: Dayjs = dayjs();
  dataMap = new Map<string, IDayCell>();
  taskOrg = UserHelper.getInstance().loginInfo.id as string | null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getCalendarData = withRequest(this.getCalendarData, "getCalendarData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeTaskOrg(org: string) {
    this.taskOrg = org;
    this.getCalendarData();
  }

  onPanelChange(date: Dayjs) {
    this.date = date;
    this.getCalendarData();
  }

  async getCalendarData() {
    const req: IReqBusinessV1CustomerFollowFollowCalendar = {
      calendarEndTime: dayjs(this.date)
        .endOf("month")
        .format("YYYY-MM-DD 23:59:59"),
      calendarStartTime: dayjs(this.date)
        .startOf("month")
        .format("YYYY-MM-DD 00:00:00"),
      userIdList: this.taskOrg || undefined,
    };
    const [err, res] = await to(customer_follow_calendar(req));

    if (err || !res) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }

    runInAction(() => {
      const dataMap = new Map<string, IDayCell>();

      for (let d of res.data || []) {
        let className = "";

        let ratio = isNil(d.rate) ? -1 : getRate100(+d.rate);
        if (dayjs(d.targetDay).isAfter()) {
          ratio = -1;
        }
        if (ratio === 100) {
          className = "success-cell";
        } else if (ratio > 0) {
          className = "warning-cell";
        } else if (ratio == 0) {
          className = "danger-cell";
        }
        dataMap.set(d.targetDay, { ...d, ratio, className });
      }

      this.dataMap = dataMap;
    });
  }
}
