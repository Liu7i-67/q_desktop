import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISideList, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { get_role_page, get_user_page } from "../../service";
import { to } from "@/utils/tools";
import { IPagination } from "@/utils/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  sidebarType: "ROLE" | "USER" = "ROLE";
  searchValue: string | undefined = undefined;
  sideList: ISideList[] = [];
  checkId: string = "";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getRoleList = withRequest(this.getRoleList, "getRoleList");
    this.getUserList = withRequest(this.getUserList, "getUserList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeSidebarType(type: "ROLE" | "USER") {
    this.sidebarType = type;
    this.searchValue = undefined;
    this.pagination.current = 1;
    this.getList();
  }
  changeSearchValue(value: string) {
    this.searchValue = value;
  }
  onPageChange(current: number) {
    this.pagination.current = current;
    this.getList();
  }

  search() {
    this.pagination.current = 1;
    this.getList();
  }

  async getRoleList() {
    const [err, res] = await to(
      get_role_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        roleName: this.searchValue,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      if (!err || !res?.data) {
        const firstId = res?.data.records[0]?.id;
        this.checkId = firstId;
        const { propsStore } = this.rootStore;
        propsStore.props.onCheck(firstId, "ROLE");
        this.sideList =
          res?.data.records.map((item) => {
            return {
              name: item.roleName,
              id: item.id,
            };
          }) || [];
        this.pagination.total = +(res.data?.total || 0);
      }
    });
  }

  async getUserList() {
    const [err, res] = await to(
      get_user_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        userName: this.searchValue,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      if (!err || !res?.data) {
        const firstId = res?.data.records[0]?.id;
        this.checkId = firstId;
        const { propsStore } = this.rootStore;
        propsStore.props.onCheck(firstId, "USER");
        this.sideList =
          res?.data.records.map((item) => {
            return {
              name: item.userName,
              id: item.id,
            };
          }) || [];
        this.pagination.total = +(res.data?.total || 0);
      }
    });
  }

  getList() {
    if (this.sidebarType === "ROLE") {
      this.getRoleList();
    } else {
      this.getUserList();
    }
  }

  onChecked(id: string) {
    this.checkId = id;
    const { propsStore } = this.rootStore;
    propsStore.props.onCheck(this.checkId, this.sidebarType);
  }
}
