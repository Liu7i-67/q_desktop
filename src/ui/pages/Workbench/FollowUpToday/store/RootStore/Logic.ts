import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { IFormInfo, ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import {
  handleJudgeCustomerIdSmallThanTwoH,
  showErrorInfo,
  to,
} from "@/utils/tools";
import {
  get_sys_dept,
  get_customer_follow_page,
} from "@/pages/Workbench/service";
import { IPagination, ITreeItem } from "@/utils/interface";
import { getDeptTree } from "../tools";
import dayjs from "dayjs";
import { ICustomerFollowRecordWeb } from "../../interface";
import { IReqBusinessV1CustomerFollowGetPage } from "@/service/business/v1/customer-follow/get-page";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  deptTree: ITreeItem[] = [];
  formInfo: IFormInfo = {};
  pagination: IPagination = {
    current: 1,
    pageSize: 20,
    total: 0,
  };
  dataSource: ICustomerFollowRecordWeb[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getSysDept = withRequest(this.getSysDept, "getSysDept");
    this.getCustomerFollowPage = withRequest(
      this.getCustomerFollowPage,
      "getCustomerFollowPage"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async init() {
    this.getSysDept();
    this.getCustomerFollowPage();
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getCustomerFollowPage();
  }

  async getSysDept() {
    const [err, res] = await to(get_sys_dept({}));
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.deptTree = getDeptTree(res.data || []);
    });
  }

  async getCustomerFollowPage() {
    const request: IReqBusinessV1CustomerFollowGetPage = {
      size: this.pagination.pageSize,
      page: this.pagination.current,
      customerKeyword: this.formInfo.customerKeyword,
    };

    if (this.formInfo.userIdList?.length) {
      request.userIdList = this.formInfo.userIdList;
    }

    const [err, res] = await to(get_customer_follow_page(request));

    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
        msg: "获取客户跟进信息失败",
      });
      return;
    }
    runInAction(() => {
      this.dataSource = (res.data?.records || []).map((r) => {
        return {
          ...r,
          hasCrossStoreRecord: handleJudgeCustomerIdSmallThanTwoH(
            r.customerId || r.id
          ),
        };
      });
      this.pagination.total = Number(res.data?.total) || 0;
    });
  }

  onReset() {
    this.formInfo = {};
    this.pagination.current = 1;
    this.getCustomerFollowPage();
  }

  onSearch(formInfo: IFormInfo) {
    this.formInfo = formInfo;
    this.pagination.current = 1;
    this.getCustomerFollowPage();
  }
}
