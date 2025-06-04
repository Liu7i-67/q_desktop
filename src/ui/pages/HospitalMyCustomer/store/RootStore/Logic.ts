import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import { delete_channel_group } from "@/pages/SchedulingManagement/service";
import { IHospitalMyCustomer } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import { get_dispatch_page } from "../../service";
import { IReqBusinessV1CustomerDispatchDispatchPage } from "@/service/business/v1/customer-dispatch/dispatch-page";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IHospitalMyCustomer[] = [];
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
    this.deleteRecord = withRequest(this.deleteRecord, "deleteRecord");
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
    const req: IReqBusinessV1CustomerDispatchDispatchPage = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      keyword: this.formInfo.keyword,
    };

    if (this.formInfo.dispatchTime?.[0] && this.formInfo.dispatchTime?.[1]) {
      req.dispatchTimeStart = this.formInfo.dispatchTime[0].format(
        "YYYY-MM-DD 00:00:00"
      );
      req.dispatchTimeEnd = this.formInfo.dispatchTime[1].format(
        "YYYY-MM-DD 23:59:59"
      );
    }

    if (this.formInfo.dispatchStatusList?.length) {
      req.dispatchStatusList = this.formInfo.dispatchStatusList?.join(",");
    }

    const [err, res] = await to(get_dispatch_page(req));
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

  async deleteRecord(record: IHospitalMyCustomer) {
    const [err, res] = await to(
      delete_channel_group({ groupIdList: [record.groupId] })
    );
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

  onAction(type: TAction, record: IHospitalMyCustomer) {
    const { refs } = this.rootStore;
    switch (type) {
      case "DISPATCH":
        {
          refs.dispatchRef.current?.open({
            id: record.id,
          });
        }
        break;
      case "HISTORY":
        {
          refs.feedbackRef.current?.openDrawer({
            dispatchItemIdList: record.dispatchItemIdList,
          });
        }
        break;
      case "MESSAGE_HISTORY": {
        {
          refs.msgRef.current?.openDrawer({ dispatchId: record.id });
        }
      }
    }
  }
}
