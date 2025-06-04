import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData, IInstitutionalFeedbackRecord } from "../../interface";
import { IPagination } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import { get_dispatch_records } from "../../service";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  dataSource: IInstitutionalFeedbackRecord[] = [];
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
    this.open = false;
    this.initData = null;
    this.dataSource = [];
    this.pagination.current = 1;
    propsStore.props.afterClose?.();
  }

  async getList() {
    if (!this.initData?.dispatchItemIdList?.length) {
      return;
    }
    const [err, res] = await to(
      get_dispatch_records({
        dispatchItemId: this.initData?.dispatchItemIdList[0],
        page: this.pagination.current,
        size: this.pagination.pageSize,
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
      this.pagination.total = +(res.data.total || 0);
      if (this.pagination.current === 1) {
        this.dataSource = res.data.records || [];
        return;
      }
      this.dataSource = [...this.dataSource, ...(res.data.records || [])];
    });
  }

  nextPage() {
    const { computed } = this.rootStore;
    if (this.pagination.total <= this.dataSource.length) {
      return;
    }
    if (computed.loading) {
      return;
    }
    this.pagination.current = this.pagination.current + 1;
    this.getList();
  }
}
