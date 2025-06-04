import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { IPagination, TAction } from "@/utils/interface";
import { get_anchor_page } from "../../service";
import { IResBaseV1LiveStreamerGetPage } from "@/service/base/v1/live-streamer/get-page";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBaseV1LiveStreamerGetPage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }

  onReset() {
    this.pagination.current = 1;
    this.getList();
  }

  async getList() {
    const values = this.rootStore.refs.searchForm.getFieldsValue();
    const [err, res] = await to(
      get_anchor_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        streamerName: values?.streamerName,
        enableFlag: values?.enableFlag,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data?.records || [];
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  recordAction(record: IResBaseV1LiveStreamerGetPage, action: TAction) {
    if (action === "EDIT") {
      this.rootStore.refs.editRef.current?.openModal({ id: record.id });
    }
  }
}
