import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from ".";
import { to } from "@/utils/tools";
import { get_shift_page, delete_shift } from "../../service";
import { IResBaseV1WorkingShiftGetList } from "@/service/base/v1/working-shift/get-list";
import { IPagination } from "@/utils/interface";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBaseV1WorkingShiftGetList[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteShift = withRequest(this.deleteShift, "deleteShift");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const [err, res] = await to(
      get_shift_page({
        page: 1,
        size: 50,
        scheduleType: "LITTLE_RED_BOOK",
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data || [];
    });
  }

  async deleteShift(id: string) {
    const [err, res] = await to(delete_shift([id]));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      message.success("删除成功");
      this.getList();
    });
  }
}
