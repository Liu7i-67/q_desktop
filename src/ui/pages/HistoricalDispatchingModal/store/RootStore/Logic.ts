import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IHistoricalDispatchingRecord, IInitData } from "../../interface";
import { get_dispatch_history_page } from "../../service";
import { to } from "@/utils/tools";
import { dispatchStatuLabel } from "@/service/business/v1/customer-dispatch/dispatch-history-page";
import { IPagination } from "@/utils/interface";
import dayjs from "dayjs";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  dataSource: IHistoricalDispatchingRecord[] = [];
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

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    if (this.initData?.phoneNumber) {
      this.getList();
    }
  }

  closeModal() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.dataSource = [];
    this.pagination.current = 1;
    this.pagination.total = 0;
    propsStore.props.afterClose?.();
  }

  async getList() {
    const [err, res] = await to(
      get_dispatch_history_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        phoneNumberList: (this.initData?.phoneNumber || []).join(","),
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource =
        res.data?.records.map((item) => ({
          ...item,
          dispatchStatusLabel: dispatchStatuLabel[item.dispatchStatus] || "",
          dispatchDateText: item.dispatchDate
            ? dayjs(+item.dispatchDate * 1000).format("YYYY-MM-DD")
            : "-",
        })) || [];
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }
}
