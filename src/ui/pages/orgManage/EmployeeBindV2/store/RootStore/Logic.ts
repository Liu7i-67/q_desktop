import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import {
  get_user_org_relation_page,
  delete_user_org_relation,
} from "../../service";
import { IPagination } from "@/utils/interface";
import { message } from "antd";
import { IResBaseV1UserOrganizationRelationGetPage } from "@/service/base/v1/user-organization-relation/get-page";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBaseV1UserOrganizationRelationGetPage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteEmployee = withRequest(this.deleteEmployee, "deleteEmployee");
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
      get_user_org_relation_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        userId: values.userId,
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

  async deleteEmployee(id: string) {
    const [err, res] = await to(delete_user_org_relation([id]));
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
