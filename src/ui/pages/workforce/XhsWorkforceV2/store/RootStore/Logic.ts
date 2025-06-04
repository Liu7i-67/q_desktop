import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { TabsProps } from "antd";
import { TXhsWorkforceTab } from "../../interface";
import { ITabItem } from "@/utils/interface";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  items: ITabItem[] = [];
  activeKey = "schedule";
  renderSet = new Set<string>();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  init() {
    const items: ITabItem[] = [];
    if (RedBookSchedulingAuth.redBookSchedulingView) {
      items.push({
        key: "schedule",
        label: "排班管理",
      });
    }
    if (RedBookSchedulingAuth.redBookSchedulingShiftView) {
      items.push({
        key: "shift",
        label: "班次管理",
      });
    }
    this.items = items;
    this.activeKey = items[0]?.key || "schedule";
    this.renderSet.add(this.activeKey);
  }
  changeActiveKey(key: TXhsWorkforceTab) {
    this.activeKey = key;
    this.renderSet.add(this.activeKey);
  }
}
