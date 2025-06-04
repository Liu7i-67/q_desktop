import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { ITabItem } from "@/utils/interface";
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
    // 获取哈希后的部分
    const hashPart = window.location.hash.split("?")[1];
    let date = "";
    let type = "";
    if (hashPart) {
      const params = new URLSearchParams(hashPart);
      date = params.get("date") || "";
      type = params.get("type") || "";
    }
    const items: ITabItem[] = [];

    if (true) {
      items.push({
        key: "taskList",
        label: "任务清单",
      });
    }
    if (true) {
      items.push({
        key: "taskCalendar",
        label: "任务日历",
      });
    }
    this.items = items;

    if (type && this.items.find((r) => r.key === type)) {
      this.activeKey = type;
    } else {
      this.activeKey = items[0]?.key || "None";
    }
    this.renderSet.add(this.activeKey);
  }

  onChange(key: string) {
    this.activeKey = key;
    this.renderSet.add(this.activeKey);
  }
}
