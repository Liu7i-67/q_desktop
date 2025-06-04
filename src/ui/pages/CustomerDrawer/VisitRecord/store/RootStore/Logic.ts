import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import {
  delete_channel_group,
  get_channel_group,
} from "@/pages/SchedulingManagement/service";
import { IVisitRecord } from "../../interface";
import { IPagination } from "@/utils/interface";
import { message } from "antd";
import {
  delete_arrival,
  get_arrival_page,
} from "@/pages/CustomerDrawer/service";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IVisitRecord[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteRecord = withRequest(this.deleteRecord, "deleteRecord");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const { propsStore } = this.rootStore;
    if (!propsStore.props.detail?.id) {
      return;
    }
    const [err, res] = await to(
      get_arrival_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        customerId: propsStore.props.detail.id,
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

  async deleteRecord(record: IVisitRecord) {
    const [err, res] = await to(delete_arrival({ idList: [record.groupId] }));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "删除失败",
      });
      return;
    }
    runInAction(() => {
      message.success("删除成功");
      this.getList();
    });
  }
}
