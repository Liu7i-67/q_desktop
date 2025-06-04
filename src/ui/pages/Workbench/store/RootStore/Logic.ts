import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { ITabItem } from "@/utils/interface";
import { WorkbenchAuth } from "../../auth";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  items: ITabItem[] = [];
  activeKey = "None";
  renderSet = new Set<string>();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    const items: ITabItem[] = [];

    if (WorkbenchAuth.todayFollow) {
      items.push({
        key: "todoToday",
        label: "今日跟进",
      });
    }
    this.items = items;
    this.activeKey = items[0]?.key || "None";
    this.renderSet.add(this.activeKey);
  }

  onChange(key: string) {
    this.activeKey = key;
    this.renderSet.add(this.activeKey);
  }
}
