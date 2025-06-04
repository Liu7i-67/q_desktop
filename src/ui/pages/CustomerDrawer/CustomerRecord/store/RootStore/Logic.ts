import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { get_channel_group } from "@/pages/SchedulingManagement/service";
import { ICustomerRecord } from "../../interface";
import { IPagination } from "@/utils/interface";
import { message } from "antd";
import { get_customer_operate_log_page } from "@/pages/CustomerDrawer/service";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: ICustomerRecord[] = [];
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
      get_customer_operate_log_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        customerId: propsStore.props.detail?.id,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.pagination.total = +(res.data?.total || 0);
      if (this.pagination.current === 1) {
        this.dataSource = res.data.records;
        return;
      }
      this.dataSource = [...this.dataSource, ...res.data.records];
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
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

  refresh() {
    this.pagination.current = 1;
    this.dataSource = [];
    this.getList();
  }
}
