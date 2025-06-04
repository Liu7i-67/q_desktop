import {
  makeAutoObservable,
  withRequest,
  runInAction,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { get_export_file_page } from "../../service";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: any[] = [];
  total: number = 0;
  current: number = 1;
  pageSize: number = 10;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getDownloadList = withRequest(this.getDownloadList, "getDownloadList");
    makeAutoObservable(this, {}, { autoBind: true });
  }
  async getDownloadList(params?: {
    page?: number;
    size?: number;
    purpose?: string;
  }) {
    const [err, res] = await to(
      get_export_file_page({
        page: this.current,
        size: this.pageSize,
        ...params,
      })
    );
    runInAction(() => {
      if (!err || !res?.data) {
        this.dataSource = res?.data?.records ?? [];
        this.total = res?.data?.total ?? 0;
      }
    });
  }
  onChangePageSize(page: number, pageSize: number) {
    this.current = page;
    this.pageSize = pageSize;
    this.getDownloadList({
      page,
      size: pageSize,
    });
  }
  onSearch() {
    const values = this.rootStore.refs.searchForm.getFieldsValue();
    this.getDownloadList({
      ...values,
      page: 1,
    });
  }
  onReset() {
    this.rootStore.refs.searchForm.resetFields();
    this.getDownloadList({ page: 1 });
  }
}
