import { AddressHelper } from "@/utils/address-helper";
import { IPagination } from "@/utils/interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { TreeDataNode } from "antd";
import { IOrgManagement } from "../../interface";
import { get_organization_page_data } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IOrgManagement[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  cityTree: TreeDataNode[];
  orgType: string;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.cityTree = [];
    this.orgType = "";
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const values = this.rootStore.refs.form.getFieldsValue();
    const [err, res] = await to(
      get_organization_page_data({
        ...values,
        ...(this.orgType
          ? {
              orgType: this.orgType,
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

  async initCityTree() {
    const res = await AddressHelper.getInstance().getTreeDataWithLevel(true, 2);
    runInAction(() => {
      this.cityTree = res as TreeDataNode[];
    });
  }

  onSelectTreeNode(selectedKeys: string[]) {
    this.orgType = selectedKeys.length ? selectedKeys[0] : "";
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
