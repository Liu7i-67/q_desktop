import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";
import { filterPermissionTree } from "../../tools";
export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getList") || loadingStore.get("deleteRecord");
  }

  get newList() {
    const { logic } = this.rootStore;
    return filterPermissionTree(logic.dataSource, logic.menuName || "");
  }
}
