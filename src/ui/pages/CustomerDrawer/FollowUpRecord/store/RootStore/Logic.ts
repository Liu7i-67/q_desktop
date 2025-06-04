import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { IFollowUpRecord } from "../../interface";
import { IPagination } from "@/utils/interface";
import { get_customer_follow_page } from "@/pages/CustomerDrawer/service";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IFollowUpRecord[] = [];
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

  async getList() {
    const { propsStore } = this.rootStore;
    if (!propsStore.props.detail?.id) {
      return;
    }
    const [err, res] = await to(
      get_customer_follow_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        customerId: propsStore.props.detail?.id,
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
}
