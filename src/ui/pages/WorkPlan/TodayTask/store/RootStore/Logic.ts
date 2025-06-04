import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from ".";
import { ITabItem } from "@/utils/interface";
import { TTodayTask } from "../../interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  items: ITabItem[] = [];
  activeKey = "deadline";
  renderSet = new Set<string>();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    const items: ITabItem[] = [
      {
        key: "deadline",
        label: "今日截止待完成",
      },
      {
        key: "total",
        label: "今日总待完成",
      },
    ];
    this.items = items;
    this.activeKey = items[0]?.key || "deadline";
    this.renderSet.add(this.activeKey);
  }
  changeActiveKey(key: TTodayTask) {
    this.activeKey = key;
    this.renderSet.add(this.activeKey);
  }
}
