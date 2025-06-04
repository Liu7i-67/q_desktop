import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import UserHelper from "@/utils/user-helper";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  userInfo = UserHelper.getInstance().loginInfo;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openDrawer(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
  }

  closeDrawer() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
  }

  afterClose() {
    console.log(777, UserHelper.getInstance().loginInfo);
    this.userInfo = UserHelper.getInstance().loginInfo;
  }
}
