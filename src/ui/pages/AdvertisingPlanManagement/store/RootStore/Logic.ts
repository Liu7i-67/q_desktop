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
import { IAdvertisingPlanManagement } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import { Modal } from "@/components/TXModal";
import { campaign_get_page } from "../../service";
import { IReqBusinessV1CampaignGetPage } from "@/service/business/v1/campaign/get-page";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IAdvertisingPlanManagement[] = [];
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
    const req: IReqBusinessV1CampaignGetPage = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      campaignName: this.formInfo.campaignName,
    };

    if (this.formInfo.channelIdList?.length) {
      req.channelIdList = this.formInfo.channelIdList.join(",");
    }

    if (this.formInfo.userIdList?.length) {
      req.userIdList = this.formInfo.userIdList.join(",");
    }

    if (this.formInfo.createTime?.[0] && this.formInfo.createTime?.[1]) {
      req.createTimeStart = this.formInfo.createTime?.[0].format(
        "YYYY-MM-DD 00:00:00"
      );
      req.createTimeEnd = this.formInfo.createTime?.[1].format(
        "YYYY-MM-DD 23:59:59"
      );
    }

    const [err, res] = await to(campaign_get_page(req));
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

  onAction(action: TAction, record: IAdvertisingPlanManagement) {
    const { refs } = this.rootStore;
    switch (action) {
      case "EDIT":
        {
          refs.editRef.current?.openModal({
            record,
          });
        }
        break;
    }
  }
}
