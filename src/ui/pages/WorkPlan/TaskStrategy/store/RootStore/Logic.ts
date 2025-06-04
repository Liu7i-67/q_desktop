import { ITabItem } from "@/utils/interface";
import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { TaskStrategyAuth } from "../../auth";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  items: ITabItem[] = [];
  activeKey: string = "NONE";
  strategyVisible: boolean = false;
  manageStartgyEditId: string = "";
  renderSet = new Set<string>();
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    const items: ITabItem[] = [];

    if (TaskStrategyAuth.taskStrategyView) {
      items.push({
        key: "EXECUTOR",
        label: "我执行的策略",
      });
      items.push({
        key: "CARETAKER",
        label: "我管理的策略",
      });
    }
    this.items = items;
    this.activeKey = items[0]?.key || "NONE";
    this.renderSet.add(this.activeKey);
  }

  onChange(key: string) {
    this.activeKey = key;
    this.renderSet.add(key);
  }

  onStrategyVisibleChange(visible: boolean) {
    this.strategyVisible = visible;
  }

  onSetManageStartgyEditId(id: string) {
    this.manageStartgyEditId = id;
  }
}
