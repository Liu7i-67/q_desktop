import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed, IRenderDom } from "./interface";
import { RootStore } from "./";
import { IFollowUpRecord } from "../../interface";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get addLoding() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("loading") || loadingStore.get("onSubmit");
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getList");
  }

  get list() {
    const { logic } = this.rootStore;
    const domList: IRenderDom[] = [];
    let year = "";
    let day = "";
    let records: IFollowUpRecord[] = [];

    for (let r of logic.dataSource) {
      const [date, time] = r.createTime.split(" ");
      const [tyear, month, tday] = date.split("-");

      if (year !== tyear) {
        if (records.length) {
          domList.push({
            type: "timeline",
            records,
          });
          records = [];
        }

        year = tyear;
        domList.push({
          type: "year",
          label: year,
        });
      }

      if (day !== `${month}-${tday}`) {
        if (records.length) {
          domList.push({
            type: "timeline",
            records,
          });
          records = [];
        }
        day = `${month}-${tday}`;
        domList.push({
          type: "day",
          label: day,
        });
      }

      records.push(r);
    }
    if (records.length) {
      domList.push({
        type: "timeline",
        records,
      });
    }

    return domList;
  }
}
