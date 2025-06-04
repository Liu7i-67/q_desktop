import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData, ILiveDataDealDrawerRecord } from "../../interface";
import { IPagination } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import { get_live_streamer_deal_customer } from "../../service";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  dataSource: ILiveDataDealDrawerRecord[] = [];
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

  openDrawer(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getList();
  }

  closeDrawer() {
    const { propsStore } = this.rootStore;
    this.initData = null;
    this.dataSource = [];
    this.pagination = {
      pageSize: 20,
      current: 1,
      total: 0,
    };
    propsStore.props.afterClose?.();
    this.open = false;
  }

  async getList() {
    const [err, res] = await to(
      get_live_streamer_deal_customer({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...this.initData,
      })
    );
    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      const records = res.data?.records || [];
      this.dataSource = records.map((item) => {
        return {
          ...item,
        };
      });
      this.pagination.total = Number(res.data.total) || 0;
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }
}
