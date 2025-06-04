import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get indeterminate() {
    const { logic } = this.rootStore;
    if (this.checkedAll) {
      return false;
    }
    if (logic.renderList.length) {
      return true;
    }
    return false;
  }

  get checkedAll() {
    const { logic } = this.rootStore;
    return logic.columnMap.size === logic.renderList.length;
  }

  get allKey() {
    const { logic } = this.rootStore;
    if (!logic.searchVal) {
      return logic.initData?.columns || [];
    }
    return (
      logic.initData?.columns?.filter((c) => {
        if (typeof c.label === "string") {
          return c.label.includes(logic.searchVal);
        }
        return false;
      }) || []
    );
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("onSubmit");
  }
}
