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
import { IConsultOrder } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import { Modal } from "@/components/TXModal";
import { today_assign_count } from "@/pages/Report/sevice";
import UserHelper from "@/utils/user-helper";
import { IReqBaseV1SysUserTodayAssignCount } from "@/service/base/v1/sys-user/today-assign-count";
import dayjs from "dayjs";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IConsultOrder[] = [];
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
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch(info: ISearchInfo) {
    this.formInfo = info;
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.dataSource = [];
    this.getList();
  }

  async getList() {
    const req: IReqBaseV1SysUserTodayAssignCount = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      tenantId: UserHelper.getInstance().loginInfo.tenantId,
      assignThreshold: 0,
      userType: "CONSULTANT",
    };

    if (this.formInfo.assignTime?.[0] && this.formInfo.assignTime?.[1]) {
      req.assignTimeStrat = this.formInfo.assignTime?.[0].format(
        "YYYY-MM-DD 00:00:00"
      );
      req.assignTimeEnd = this.formInfo.assignTime?.[1].format(
        "YYYY-MM-DD 23:59:59"
      );
    } else {
      req.assignTimeStrat = dayjs().format("YYYY-MM-DD 00:00:00");
      req.assignTimeEnd = dayjs().format("YYYY-MM-DD 23:59:59");
    }

    if (this.formInfo.idList?.length) {
      req.idList = this.formInfo.idList.join(",");
    }

    const [err, res] = await to(today_assign_count(req));
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
