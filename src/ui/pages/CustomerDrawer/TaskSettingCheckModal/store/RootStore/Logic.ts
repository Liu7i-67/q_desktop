import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import { get_customer_follow_page } from "@/pages/CustomerDrawer/service";
import { IOption } from "@/utils/interface";
import dayjs from "dayjs";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  options: IOption[] = [];
  value: IOption[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.checkPlan = withRequest(this.checkPlan, "checkPlan");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async checkPlan(customerId: string, currentDate?: string) {
    const [err, res] = await to(
      get_customer_follow_page({
        page: 1,
        size: 1000,
        customerId,
        sourceEnum: "MANUAL_CREATE",
        statusEnumList: ["WAIT_START", "WAIT_COMPLETE"],
      })
    );
    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
        msg: "查询跟进任务失败",
      });
      return false;
    }

    const options: IOption[] = [];

    const today = dayjs().format("YYYY-MM-DD");

    for (let r of res.data.records || []) {
      if (!r.startDate || r.startDate === today) {
        continue;
      }
      options.push({
        label: r.startDate,
        value: r.id,
      });
    }

    if (options.length === 0) {
      return true;
    }

    if (currentDate) {
      options.push({
        label: currentDate,
        value: "cancel",
      });
    }

    runInAction(() => {
      this.openModal();
      this.options = options;
    });

    return false;
  }

  changeValue(v: IOption[]) {
    this.value = v;
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.options = [];
  }

  onOk() {
    const { propsStore } = this.rootStore;

    const cancelIds: string[] = [];

    let noNextDay = false;

    for (let r of this.value) {
      if (r.value === "cancel") {
        noNextDay = true;
        continue;
      }
      cancelIds.push(r.value);
    }

    propsStore.props.afterClose?.(cancelIds, noNextDay);
    this.closeModal();
  }
}
