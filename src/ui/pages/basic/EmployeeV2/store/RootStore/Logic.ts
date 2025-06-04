import { IResBaseV1SysUserGetPage } from "@/service/base/v1/sys-user/get-page";
import { IPagination } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { get_sys_user_page, rest_password } from "../../service";
import { RootStore } from "./";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBaseV1SysUserGetPage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  formInfo: ISearchInfo = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.onRestPassword = withRequest(this.onRestPassword, "onRestPassword");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const values = this.rootStore.refs.form.getFieldsValue();
    const [err, res] = await to(
      get_sys_user_page({
        ...values,
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

  async onRestPassword(id: string) {
    const [err, res] = await to(
      rest_password({
        id,
      })
    );
    if (err || !res || (res && res.code !== 200)) {
      showErrorInfo({
        err,
        res,
        msg: "重置密码失败",
      });
      return;
    }
    message.success("重置密码成功");
    this.getList();
    this.rootStore.refs.resetPasswordInfoRef.current?.openModal({
      password: res.data,
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }

  onReset() {
    this.pagination.current = 1;
    this.getList();
  }
}
