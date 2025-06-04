import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";
import { IResBusinessV1CustomerCollabDetail } from "@/service/business/v1/customer-collab/detail";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getDetail") || loadingStore.get("submit");
  }

  disabledEdit(record: IResBusinessV1CustomerCollabDetail) {
    const { logic } = this.rootStore;
    if (!logic.initData?.justAdd) {
      return false;
    }
    return (
      !record.id.startsWith("web_test_") &&
      record.collabType === "COLLABORATION"
    );
  }
}
