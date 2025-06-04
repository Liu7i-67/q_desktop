import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import UserHelper from "@/utils/user-helper";
import { to } from "@/utils/tools";
import { speaker } from "@/utils/speaker";
import { EUserType } from "@/utils/user-helper/interface";
import { get_dispatch_page } from "@/pages/HospitalMyCustomer/service";
import dayjs from "dayjs";

const tenantId = UserHelper.getInstance().tenantId;

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  listenFlag = true;
  timer: NodeJS.Timeout | null = null;
  latestId = -1;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getHospitalData = withRequest(this.getHospitalData, "getHospitalData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    const hiddenListenFlag = localStorage.getItem(
      `${UserHelper.getInstance().getUserId}_hiddenListenFlag`
    );

    // 非机构账号不开启
    if (UserHelper.getInstance().loginInfo.userType !== EUserType.ORG) {
      return;
    }

    if (hiddenListenFlag) {
      this.listenFlag = false;
    } else {
      this.getHospitalData();
    }
  }

  changeListenFlag() {
    this.listenFlag = !this.listenFlag;

    if (this.listenFlag) {
      localStorage.removeItem(
        `${UserHelper.getInstance().getUserId}_hiddenListenFlag`
      );
      this.getHospitalData();
      return;
    }
    localStorage.setItem(
      `${UserHelper.getInstance().getUserId}_hiddenListenFlag`,
      "true"
    );

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  async getHospitalData() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const nextTime = 30 * 1000 + Math.floor(Math.random() * 5000);

    const [err, res] = await to(
      get_dispatch_page({
        page: 1,
        size: 1,
        orgId: UserHelper.getInstance().loginInfo.orgId,
      })
    );

    runInAction(() => {
      this.timer = setTimeout(() => {
        this.getHospitalData();
      }, nextTime);
    });

    if (err) {
      return;
    }

    runInAction(() => {
      let id = res?.data?.records?.[0]?.createTime;

      if (!id) {
        this.latestId = 0;
        return;
      }

      const nextId = new Date(id).getTime();

      if (nextId <= this.latestId) {
        return;
      }

      if (this.latestId !== -1) {
        speaker(`您有新的${tenantId === "1" ? "讨喜" : "清颜"}派单待处理`);
      }

      this.latestId = nextId;
    });
  }
}
