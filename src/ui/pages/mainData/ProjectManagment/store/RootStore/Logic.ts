import { IPagination } from "@/utils/interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { IProjectManagment } from "../../interface";
import { get_project_page } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IProjectManagment[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  typeId: string;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.typeId = "";
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const values = this.rootStore.refs.form.getFieldsValue();
    const [err, res] = await to(
      get_project_page({
        ...values,
        ...(this.typeId
          ? {
              typeId: this.typeId,
            }
          : {}),
        page: this.pagination.current,
        size: this.pagination.pageSize,
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

  onSelectTreeNode(selectedKeys: string[]) {
    this.typeId = selectedKeys.length ? selectedKeys[0] : "";
    this.getList();
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  onReset() {
    this.pagination.current = 1;
    this.getList();
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }
}
